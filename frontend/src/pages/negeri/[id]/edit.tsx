import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaSave, FaTimes } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { fetchNegeriById, updateNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import { UpdateNegeriDto } from '@/types';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function EditNegeri() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateNegeriDto>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { selectedItem, loading, error } = useSelector((state: RootState) => state.negeri);
  
  useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(fetchNegeriById(parseInt(id)));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    if (selectedItem) {
      reset({
        name: selectedItem.name,
      });
    }
  }, [selectedItem, reset]);
  
  const onSubmit = async (data: UpdateNegeriDto) => {
    if (!id || typeof id !== 'string') return;
    
    setIsSubmitting(true);
    try {
      await dispatch(updateNegeri({ id: parseInt(id), negeriData: data })).unwrap();
      toast.success('State updated successfully');
      router.push('/negeri');
    } catch (err) {
      toast.error('Failed to update state');
      setIsSubmitting(false);
    }
  };

  if (loading && !selectedItem) {
    return (
      <Layout title="Kamus Negeri - Edit State">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!selectedItem && !loading) {
    return (
      <Layout title="Kamus Negeri - State Not Found">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">State Not Found</h1>
          <p className="mb-6">The state you are looking for does not exist.</p>
          <Link href="/negeri" className="btn btn-primary">
            Back to States
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Kamus Negeri - Edit State">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit State</h1>
          <Link href="/negeri" className="btn btn-outline flex items-center">
            <FaTimes className="mr-2" />
            Cancel
          </Link>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="card">
          {/* Name Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-text-secondary mb-1">
              State Name*
            </label>
            <input
              id="name"
              type="text"
              className={`input w-full ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter state name"
              {...register('name', { 
                required: 'State name is required',
                minLength: { value: 2, message: 'State name must be at least 2 characters' }
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary flex items-center"
              disabled={isSubmitting || loading}
            >
              <FaSave className="mr-2" />
              {isSubmitting || loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
