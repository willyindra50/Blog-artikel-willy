'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Menu, Search } from 'lucide-react'; // optional icon lib

interface User {
  name: string;
  avatarUrl?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    try {
      if (token && userData && userData !== 'undefined') {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      localStorage.removeItem('user');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <header className='border-b'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Image src='/Your-logo.png' alt='Logo' width={30} height={30} />
          <span className='font-semibold text-lg'>Your Logo</span>
        </div>

        {/* Desktop: Search Bar */}
        <div className='hidden md:block w-full max-w-md relative'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = (
                e.currentTarget.elements.namedItem('search') as HTMLInputElement
              ).value.trim();
              if (q) {
                router.push(`/search?q=${encodeURIComponent(q)}`);
              }
            }}
            className='hidden md:block w-full max-w-md relative'
          >
            <input
              name='search'
              type='text'
              placeholder='Search'
              className='w-full pl-10 pr-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
            />
            <Image
              src='/search-icon.png'
              alt='Search'
              width={20}
              height={20}
              className='absolute left-3 top-2.5 object-contain text-gray-400'
            />
          </form>
        </div>

        {/* Desktop */}
        <div className='hidden md:flex items-center gap-4 relative'>
          {user ? (
            <>
              <Link
                href='/write-post'
                className='text-blue-600 text-sm font-medium hover:underline flex items-center gap-1'
              >
                <Image
                  src='/pencil.png'
                  alt='Write'
                  width={16}
                  height={16}
                  className='object-contain'
                />
                <span>Write Post</span>
              </Link>

              <div className='w-px h-6 bg-gray-300'></div>
              <div
                className='flex items-center gap-2 cursor-pointer'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Image
                  src={user.avatarUrl || '/default-avatar.png'}
                  alt='Avatar'
                  width={32}
                  height={32}
                  className='rounded-full object-cover'
                />
                <span className='text-sm font-medium'>{user.name}</span>
              </div>
              {showDropdown && (
                <div className='absolute top-14 right-0 bg-white shadow-md border rounded-md w-40 z-50'>
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm hover:bg-gray-100'
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500'
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='text-sm text-blue-600 font-medium hover:underline'
              >
                Login
              </Link>
              <div className='w-px h-4 bg-gray-300'></div>
              <Link
                href='/register'
                className='bg-[#009DFB] text-white text-sm px-5 py-2 rounded-full font-semibold hover:bg-blue-700'
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className='md:hidden flex items-center gap-4'>
          {!user ? (
            <>
              <Search className='w-5 h-5 text-gray-600' />
              <Menu
                className='w-6 h-6 text-gray-800'
                onClick={() => setShowMobileMenu(true)}
              />
            </>
          ) : (
            <div className='relative'>
              <div
                className='cursor-pointer'
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Image
                  src={user.avatarUrl || '/default-avatar.png'}
                  alt='Avatar'
                  width={32}
                  height={32}
                  className='rounded-full object-cover'
                />
              </div>
              {showDropdown && (
                <div className='absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-50 w-40'>
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm hover:bg-gray-100'
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && !user && (
        <div className='fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center'>
          <button
            onClick={() => setShowMobileMenu(false)}
            className='absolute top-4 right-4 text-3xl'
          >
            <X />
          </button>

          <Link
            href='/login'
            className='text-blue-500 underline text-base mb-6'
            onClick={() => setShowMobileMenu(false)}
          >
            Login
          </Link>

          <Link href='/register' onClick={() => setShowMobileMenu(false)}>
            <button className='bg-[#009DFB] text-white px-10 py-2 rounded-full font-semibold text-base'>
              Register
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
