import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaSave, FaTimes } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { createNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import { CreateNegeriDto } from '@/types';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function CreateNegeri() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateNegeriDto>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { loading, error } = useSelector((state: RootState) => state.negeri);
  
  const onSubmit = async (data: CreateNegeriDto) => {
    setIsSubmitting(true);
    try {
      await dispatch(createNegeri(data)).unwrap();
      toast.success('State created successfully');
      router.push('/negeri');
    } catch (err) {
      toast.error('Failed to create state');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Kamus Negeri - Add New State">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New State</h1>
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
              {isSubmitting || loading ? 'Saving...' : 'Save State'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
