'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '@/api';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await API.post('/auth/register', formData);
      router.push('/login');
    } catch {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow'>
      <h2 className='text-2xl font-bold mb-6'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {['name', 'email', 'password', 'confirmPassword'].map((field) => (
          <div key={field}>
            <label
              className='block text-sm font-medium capitalize mb-1'
              htmlFor={field}
            >
              {field === 'confirmPassword'
                ? 'Confirm Password'
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className='relative'>
              <input
                id={field}
                name={field}
                type={
                  field.toLowerCase().includes('password') ? 'password' : 'text'
                }
                placeholder={`Enter your ${
                  field === 'confirmPassword' ? 'confirm password' : field
                }`}
                className={`w-full border px-4 py-2 rounded ${
                  errors[field as keyof typeof errors]
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
              />
              {field.toLowerCase().includes('password') && (
                <span className='absolute right-3 top-3 text-gray-400'>👁️</span>
              )}
            </div>
            {errors[field as keyof typeof errors] && (
              <p className='text-red-500 text-sm mt-1'>
                {errors[field as keyof typeof errors]}
              </p>
            )}
          </div>
        ))}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 disabled:opacity-60'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className='mt-4 text-sm text-center'>
        Already have an account?{' '}
        <Link href='/login' className='text-blue-600 hover:underline'>
          Log in
        </Link>
      </p>
    </div>
  );
}
