import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaRandom, FaArrowRight } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { fetchRandomKamus } from '@/redux/slices/kamusSlice';
import { fetchNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import Link from 'next/link';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNegeriId, setSelectedNegeriId] = useState<string>('');
  
  const { randomItems, loading } = useSelector((state: RootState) => state.kamus);
  const { items: negeriItems = [] } = useSelector((state: RootState) => state.negeri);
  
  useEffect(() => {
    dispatch(fetchRandomKamus(5));
    dispatch(fetchNegeri());
  }, [dispatch]);
  
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
      });
    } else {
      router.push('/kamus');
    }
  };
  
  const handleRefreshRandom = () => {
    dispatch(fetchRandomKamus(5));
  };
  
  const getNegeriName = (negeriId: number) => {
    if (!Array.isArray(negeriItems)) return 'Unknown';
    const negeri = negeriItems.find(n => n.id === negeriId);
    return negeri ? negeri.name : 'Unknown';
  };

  return (
    <Layout title="Kamus Negeri - Malaysian State Dialect Dictionary">
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Kamus Negeri
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8">
            Temui kepelbagaian dialek yang kaya di negeri-negeri Malaysia
          </p>
          
          {/* Search Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
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
                    <option key="all-states" value="">Semua Negeri</option>
                    {Array.isArray(negeriItems) && negeriItems.map((negeri) => (
                      <option key={negeri.id} value={negeri.id}>
                        {negeri.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary w-full md:w-auto px-8 flex items-center justify-center"
                >
                  Cari dialek
                  <FaSearch className="ml-2" />
                </button>
              </div>
            </form>
            
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Link href="/kamus" className="text-primary hover:underline flex items-center">
                <span>Lihat semua entri</span>
                <FaArrowRight className="ml-1" />
              </Link>
              <span className="text-text-secondary mx-2">•</span>
              <Link href="/negeri" className="text-primary hover:underline flex items-center">
                <span>Cari mengikut negeri</span>
                <FaArrowRight className="ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Random Entries Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Temui Perkataan Dialek Secara Rawak</h2>
              <button
                onClick={handleRefreshRandom}
                className="btn btn-outline flex items-center"
                disabled={loading}
              >
                <FaRandom className="mr-2" />
                Refresh
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomItems.map((item) => (
                  <div key={item.id} className="card">
                    <Link href={`/kamus/${item.id}`} className="block hover:no-underline">
                      <h3 className="text-xl font-bold text-primary mb-1">{item.dialek}</h3>
                      <span className="text-sm text-text-secondary block mb-2">
                        From {getNegeriName(item.negeri_id)}
                      </span>
                      <p className="text-lg">{item.maksud}</p>
                      {item.contoh_ayat && (
                        <div className="mt-3 italic text-text-secondary border-l-4 border-gray-300 pl-3">
                          "{item.contoh_ayat}"
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            )}
            
            {!loading && randomItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-text-secondary">No entries found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
