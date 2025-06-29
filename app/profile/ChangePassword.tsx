'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <form className='space-y-6'>
      <div>
        <label className='block text-sm mb-1'>Current Password</label>
        <div className='relative'>
          <input
            type={showPassword.current ? 'text' : 'password'}
            className='w-full px-4 py-2 border rounded-xl'
            placeholder='Enter current password'
          />
          <Eye
            className='absolute right-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer'
            onClick={() => toggleShow('current')}
          />
        </div>
      </div>

      <div>
        <label className='block text-sm mb-1'>New Password</label>
        <div className='relative'>
          <input
            type={showPassword.new ? 'text' : 'password'}
            className='w-full px-4 py-2 border rounded-xl'
            placeholder='Enter new password'
          />
          <Eye
            className='absolute right-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer'
            onClick={() => toggleShow('new')}
          />
        </div>
      </div>

      <div>
        <label className='block text-sm mb-1'>Confirm New Password</label>
        <div className='relative'>
          <input
            type={showPassword.confirm ? 'text' : 'password'}
            className='w-full px-4 py-2 border rounded-xl'
            placeholder='Enter confirm new password'
          />
          <Eye
            className='absolute right-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer'
            onClick={() => toggleShow('confirm')}
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full bg-[#009DFB] text-white py-2 rounded-full font-semibold'
      >
        Update Password
      </button>
    </form>
  );
}
