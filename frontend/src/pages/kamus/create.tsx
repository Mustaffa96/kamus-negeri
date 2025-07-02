import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaSave, FaTimes } from 'react-icons/fa';
import Layout from '@/components/layout/Layout';
import { RootState } from '@/redux/store';
import { createKamus } from '@/redux/slices/kamusSlice';
import { fetchNegeri } from '@/redux/slices/negeriSlice';
import type { AppDispatch } from '@/redux/store';
import { CreateKamusDto } from '@/types';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function CreateKamus() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateKamusDto>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { loading, error } = useSelector((state: RootState) => state.kamus);
  const { items: negeriItems, loading: negeriLoading } = useSelector((state: RootState) => state.negeri);
  
  useEffect(() => {
    dispatch(fetchNegeri());
  }, [dispatch]);
  
  const onSubmit = async (data: CreateKamusDto) => {
    setIsSubmitting(true);
    try {
      // Convert negeri_id to number
      const formData = {
        ...data,
        negeri_id: Number(data.negeri_id)
      };
      
      await dispatch(createKamus(formData)).unwrap();
      toast.success('Entry created successfully');
      router.push('/kamus');
    } catch (err) {
      toast.error('Failed to create entry');
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Kamus Negeri - Add New Entry">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Dictionary Entry</h1>
          <Link href="/kamus" className="btn btn-outline flex items-center">
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
          {/* Dialek Field */}
          <div className="mb-4">
            <label htmlFor="dialek" className="block text-text-secondary mb-1">
              Dialect Word*
            </label>
            <input
              id="dialek"
              type="text"
              className={`input w-full ${errors.dialek ? 'border-red-500' : ''}`}
              placeholder="Enter dialect word"
              {...register('dialek', { required: 'Dialect word is required' })}
            />
            {errors.dialek && (
              <p className="text-red-500 text-sm mt-1">{errors.dialek.message}</p>
            )}
          </div>
          
          {/* Maksud Field */}
          <div className="mb-4">
            <label htmlFor="maksud" className="block text-text-secondary mb-1">
              Meaning*
            </label>
            <textarea
              id="maksud"
              className={`input w-full ${errors.maksud ? 'border-red-500' : ''}`}
              placeholder="Enter meaning of the dialect word"
              rows={3}
              {...register('maksud', { required: 'Meaning is required' })}
            ></textarea>
            {errors.maksud && (
              <p className="text-red-500 text-sm mt-1">{errors.maksud.message}</p>
            )}
          </div>
          
          {/* Contoh Ayat Field */}
          <div className="mb-4">
            <label htmlFor="contoh_ayat" className="block text-text-secondary mb-1">
              Example Sentence
            </label>
            <textarea
              id="contoh_ayat"
              className="input w-full"
              placeholder="Enter an example sentence using the dialect word"
              rows={2}
              {...register('contoh_ayat')}
            ></textarea>
          </div>
          
          {/* Negeri Selection */}
          <div className="mb-6">
            <label htmlFor="negeri_id" className="block text-text-secondary mb-1">
              State*
            </label>
            <select
              id="negeri_id"
              className={`input w-full ${errors.negeri_id ? 'border-red-500' : ''}`}
              {...register('negeri_id', { required: 'State is required' })}
              disabled={negeriLoading}
            >
              <option value="">Select a state</option>
              {negeriItems.map((negeri) => (
                <option key={negeri.id} value={negeri.id}>
                  {negeri.name}
                </option>
              ))}
            </select>
            {errors.negeri_id && (
              <p className="text-red-500 text-sm mt-1">{errors.negeri_id.message}</p>
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
              {isSubmitting || loading ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
