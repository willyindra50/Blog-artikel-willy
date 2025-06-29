'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import SearchContent from './SearchContent';

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className='text-center py-10'>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </>
  );
}
