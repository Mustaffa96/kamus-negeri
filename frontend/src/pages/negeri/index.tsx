import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { fetchNegeri, deleteNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function NegeriList() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { name } = router.query;
  const [searchTerm, setSearchTerm] = useState(name as string || '');
  
  const { items = [], loading, error } = useSelector((state: RootState) => state.negeri);
  
  useEffect(() => {
    if (name) {
      dispatch(fetchNegeri(name as string));
      setSearchTerm(name as string);
    } else {
      dispatch(fetchNegeri());
    }
  }, [dispatch, name]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      router.push({
        pathname: '/negeri',
        query: { name: searchTerm },
      }, undefined, { shallow: true });
    } else {
      router.push('/negeri', undefined, { shallow: true });
      dispatch(fetchNegeri());
    }
  };
  
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this state? This will also delete all associated dialect entries.')) {
      try {
        await dispatch(deleteNegeri(id)).unwrap();
        toast.success('State deleted successfully');
      } catch (err) {
        toast.error('Failed to delete state');
      }
    }
  };

  // Ensure items is always an array
  const negeriItems = Array.isArray(items) ? items : [];

  return (
    <Layout title="Kamus Negeri - States">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Malaysian States</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for states..."
              className="input flex-grow"
              aria-label="Search for states"
            />
            <button
              type="submit"
              className="btn btn-primary ml-2 flex items-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </form>
        </div>
        
        {/* Add New State Button */}
        <div className="mb-6">
          <Link href="/negeri/create" className="btn btn-secondary flex items-center w-fit">
            <FaPlus className="mr-2" />
            Add New State
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
              {negeriItems.length} {negeriItems.length === 1 ? 'state' : 'states'} found
            </p>
            
            {/* States List */}
            {negeriItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {negeriItems.map((item) => (
                  <div key={item.id} className="card">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                      </div>
                      <div className="flex space-x-2">
                        <Link 
                          href={`/kamus?negeriId=${item.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          title="View Dialect Entries"
                        >
                          View Entries
                        </Link>
                        <Link 
                          href={`/negeri/${item.id}/edit`}
                          className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                          title="Edit State"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          title="Delete State"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-text-secondary">No states found</p>
                {searchTerm && (
                  <p className="mt-2">
                    Try a different search term or{' '}
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        router.push('/negeri');
                        dispatch(fetchNegeri());
                      }}
                      className="text-primary hover:underline"
                    >
                      tunjuk semua negeri
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
