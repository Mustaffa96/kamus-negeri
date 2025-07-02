import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { fetchKamus, fetchKamusByNegeriId, deleteKamus } from '@/redux/slices/kamusSlice';
import { fetchNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function KamusList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { dialek, negeriId } = router.query;
  const [searchTerm, setSearchTerm] = useState(dialek as string || '');
  const [selectedNegeriId, setSelectedNegeriId] = useState<string>(negeriId as string || '');
  
  const { items, loading, error } = useSelector((state: RootState) => state.kamus);
  const { items: negeriItems } = useSelector((state: RootState) => state.negeri);
  
  useEffect(() => {
    dispatch(fetchNegeri());
    
    if (negeriId && typeof negeriId === 'string') {
      dispatch(fetchKamusByNegeriId(parseInt(negeriId)));
      setSelectedNegeriId(negeriId);
    } else if (dialek) {
      dispatch(fetchKamus(dialek as string));
      setSearchTerm(dialek as string);
    } else {
      dispatch(fetchKamus());
    }
  }, [dispatch, dialek, negeriId]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const query: { [key: string]: string } = {};
    
    if (searchTerm.trim()) {
      query.dialek = searchTerm.trim();
    }
    
    if (selectedNegeriId) {
      query.negeriId = selectedNegeriId;
    }
    
    if (Object.keys(query).length > 0) {
      router.push({
        pathname: '/kamus',
        query
      }, undefined, { shallow: true });
    } else {
      router.push('/kamus', undefined, { shallow: true });
      dispatch(fetchKamus());
    }
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await dispatch(deleteKamus(id)).unwrap();
        toast.success('Berjaya memadam entri');
      } catch (err) {
        toast.error('Gagal memadam entri');
      }
    }
  };
  
  const getNegeriName = (negeriId: number) => {
    if (!Array.isArray(negeriItems)) return 'Unknown';
    const negeri = negeriItems.find(n => n.id === negeriId);
    return negeri ? negeri.name : 'Unknown';
  };
  
  const getCurrentNegeriName = () => {
    if (selectedNegeriId && Array.isArray(negeriItems) && negeriItems.length > 0) {
      const negeri = negeriItems.find(n => n.id === parseInt(selectedNegeriId));
      return negeri ? negeri.name : null;
    }
    return null;
  };

  return (
    <Layout title="Kamus Negeri - Dictionary">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Entri Kamus
          {getCurrentNegeriName() && (
            <span className="text-text-secondary"> for {getCurrentNegeriName()}</span>
          )}
        </h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:gap-4">
            <div className="flex-grow">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari perkataan dialek..."
                className="input w-full"
                aria-label="Search for dialect words"
              />
            </div>
            <div className="w-full md:w-1/3">
              <select
                value={selectedNegeriId}
                onChange={(e) => setSelectedNegeriId(e.target.value)}
                className="input w-full"
                aria-label="Filter by state"
              >
                <option value="">Semua Negeri</option>
                {negeriItems.map((negeri) => (
                  <option key={negeri.id} value={negeri.id}>
                    {negeri.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary flex items-center w-full md:w-auto"
            >
              <FaSearch className="mr-2" />
              Cari
            </button>
          </form>
        </div>
        
        {/* Add New Entry Button */}
        <div className="mb-6">
          <Link href="/kamus/create" className="btn btn-secondary flex items-center w-fit">
            <FaPlus className="mr-2" />
            Tambah Entri baru
          </Link>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <p className="mb-4 text-text-secondary">
              {items.length} {items.length === 1 ? 'entry' : 'entries'} dijumpai
            </p>
            
            {/* Dictionary Entries */}
            {items.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{item.dialek}</h3>
                        <span className="text-sm text-text-secondary">
                          Dari {getNegeriName(item.negeri_id)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/kamus/${item.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="Lihat Maklumat"
                        >
                          <FaEye />
                        </Link>
                        <Link 
                          href={`/kamus/${item.id}/edit`}
                          className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                          title="Edit Entri"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Padam Entri"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-medium mt-2">{item.maksud}</p>
                    {item.contoh_ayat && (
                      <div className="mt-3 italic text-text-secondary border-l-4 border-gray-300 pl-3">
                        "{item.contoh_ayat}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-text-secondary">Tiada entri dijumpai</p>
                {(searchTerm || selectedNegeriId) && (
                  <p className="mt-2">
                    Cuba carian lain atau{' '}
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedNegeriId('');
                        router.push('/kamus');
                        dispatch(fetchKamus());
                      }}
                      className="text-primary hover:underline"
                    >
                      lihat semua entri
                    </button>
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
