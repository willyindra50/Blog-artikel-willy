'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '@/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', { email, password });

      const { token } = res.data;

      // Fallback user jika tidak ada di response
      const user = res.data.user || {
        name: 'Guest',
        avatarUrl: '/default-avatar.png',
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/');
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <form
        onSubmit={handleLogin}
        className='bg-white rounded-xl shadow-md p-8 w-full max-w-md'
      >
        <h2 className='text-2xl font-semibold mb-6'>Sign In</h2>

        <label className='block text-sm font-medium mb-1'>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-xl text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder='Enter your email'
          required
        />

        <label className='block text-sm font-medium mb-1'>Password</label>
        <div className='relative mb-4'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder='Enter your password'
            required
          />
          <span
            className='absolute right-3 top-2.5 text-gray-500 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full text-sm font-semibold transition'
        >
          Login
        </button>

        <p className='text-center text-sm mt-4'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='text-blue-600 font-medium'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
