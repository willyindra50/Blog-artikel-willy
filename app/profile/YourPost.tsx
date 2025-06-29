import Image from 'next/image';
import Link from 'next/link';

export default function YourPost() {
  return (
    <div className='text-center py-20'>
      <Image
        src='/no-result.png'
        alt='Empty'
        width={80}
        height={80}
        className='mx-auto mb-6'
      />
      <h3 className='font-semibold text-sm'>
        Your writing journey starts here
      </h3>
      <p className='text-sm text-gray-500 mb-6'>
        No posts yet, but every great writer starts with the first one.
      </p>
      <Link href='/write-post'>
        <button className='bg-[#009DFB] text-white px-6 py-2 rounded-full font-medium text-sm'>
          ✍️ Write Post
        </button>
      </Link>
    </div>
  );
}
