import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { fetchKamusById, deleteKamus } from '@/redux/slices/kamusSlice';
import { fetchNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function KamusDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  
  const { selectedItem, loading, error } = useSelector((state: RootState) => state.kamus);
  const { items: negeriItems } = useSelector((state: RootState) => state.negeri);
  
  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(fetchKamusById(parseInt(id)));
      dispatch(fetchNegeri());
    }
  }, [dispatch, id]);
  
  const handleDelete = async () => {
    if (!id || typeof id !== 'string') return;
    
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await dispatch(deleteKamus(parseInt(id))).unwrap();
        toast.success('Entry deleted successfully');
        router.push('/kamus');
      } catch (err) {
        toast.error('Failed to delete entry');
      }
    }
  };
  
  const getNegeriName = (negeriId: number) => {
    const negeri = negeriItems.find(n => n.id === negeriId);
    return negeri ? negeri.name : 'Unknown';
  };

  if (loading && !selectedItem) {
    return (
      <Layout title="Kamus Negeri - Loading Entry">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!selectedItem && !loading) {
    return (
      <Layout title="Kamus Negeri - Entry Not Found">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Entry Not Found</h1>
          <p className="mb-6">The dictionary entry you are looking for does not exist.</p>
          <Link href="/kamus" className="btn btn-primary">
            Back to Dictionary
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Kamus Negeri - ${selectedItem?.dialek || 'Entry Details'}`}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/kamus" className="btn btn-outline flex items-center w-fit mb-6">
          <FaArrowLeft className="mr-2" />
          Back to Dictionary
        </Link>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {selectedItem && (
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-primary mb-2">{selectedItem.dialek}</h1>
                <div className="text-lg text-text-secondary">
                  From <span className="font-medium">{getNegeriName(selectedItem.negeri_id)}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  href={`/kamus/${selectedItem.id}/edit`}
                  className="btn btn-secondary flex items-center"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger flex items-center"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Meaning</h2>
              <div className="p-4 bg-gray-50 rounded-lg text-lg">
                {selectedItem.maksud}
              </div>
            </div>
            
            {selectedItem.contoh_ayat && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Example Sentence</h2>
                <div className="p-4 bg-gray-50 rounded-lg text-lg italic">
                  "{selectedItem.contoh_ayat}"
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
