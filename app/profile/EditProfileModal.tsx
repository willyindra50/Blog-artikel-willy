'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('John Doe');
  const [headline, setHeadline] = useState('Frontend Developer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan perubahan profile ke backend (API call here)
    console.log('Updated:', { name, headline });
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md relative'>
        {/* Close */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-500 hover:text-black'
        >
          <X />
        </button>

        {/* Title */}
        <h2 className='text-lg font-semibold text-center mb-6'>Edit Profile</h2>

        {/* Avatar */}
        <div className='flex justify-center mb-4 relative'>
          <div className='relative'>
            <Image
              src='/default-avatar.png'
              alt='Avatar'
              width={72}
              height={72}
              className='rounded-full'
            />
            <div className='absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow'>
              <Image src='/photo-icon.png' alt='lock' width={16} height={16} />
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm mb-1'>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-4 py-2 border rounded-xl'
            />
          </div>
          <div>
            <label className='block text-sm mb-1'>Profile Headline</label>
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className='w-full px-4 py-2 border rounded-xl'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-[#009DFB] text-white py-2 rounded-full font-semibold'
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
