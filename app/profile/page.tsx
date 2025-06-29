'use client';

import { useState } from 'react';
import Image from 'next/image';
import YourPost from './YourPost';
import ChangePassword from './ChangePassword';
import EditProfileModal from './EditProfileModal';
import Navbar from '@/components/Navbar';
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'post' | 'password'>('post');
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 py-10'>
        {/* Header */}
        <div className='flex items-center justify-between border rounded-xl p-6 mb-8'>
          <div className='flex items-center gap-4'>
            <Image
              src='/default-avatar.png'
              alt='User Avatar'
              width={64}
              height={64}
              className='rounded-full'
            />
            <div>
              <h2 className='font-semibold text-lg'>John Doe</h2>
              <p className='text-sm text-gray-500'>Frontend Developer</p>
            </div>
          </div>
          <button
            className='text-blue-600 text-sm font-medium hover:underline'
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className='border-b mb-6'>
          <nav className='flex gap-6 text-sm font-medium'>
            <button
              className={`pb-2 ${
                activeTab === 'post'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('post')}
            >
              Your Post
            </button>
            <button
              className={`pb-2 ${
                activeTab === 'password'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'post' ? <YourPost /> : <ChangePassword />}

        {/* Edit Profile Modal */}
        {showEditModal && (
          <EditProfileModal onClose={() => setShowEditModal(false)} />
        )}
      </div>
    </>
  );
}
