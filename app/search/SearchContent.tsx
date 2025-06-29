'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import { localApi } from '@/api-local';
import { parseLexicalContent } from '@/utils/parseLexicalContent';
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: { id: number; name: string };
  createdAt: string;
  likes: number;
  comments: number;
}

const fetchSearchResults = async (q: string): Promise<Post[]> => {
  const res = await localApi.get(`/posts/search?q=${q}`);
  return res.data.data;
};

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [keyword, setKeyword] = useState(query);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['search-results', query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='md:hidden px-4 mt-6'>
        <div className='w-full bg-white border rounded-xl px-4 py-2 flex items-center'>
          <Image src='/search-icon.png' alt='Search' width={16} height={16} />
          <input
            type='text'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search articles...'
            className='ml-2 text-sm text-gray-700 w-full focus:outline-none'
          />
        </div>
      </form>

      <main className='max-w-5xl mx-auto px-4 py-10'>
        <h2 className='text-xl md:text-2xl font-semibold mb-6'>
          Result for <span className='text-blue-600'>“{query}”</span>
        </h2>

        {isLoading ? (
          <div className='text-center py-10'>Loading...</div>
        ) : posts && posts.length > 0 ? (
          <div className='space-y-8'>
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className='flex flex-col md:flex-row gap-4 md:gap-6 hover:bg-gray-50 p-4 rounded-xl transition'
              >
                <Image
                  src={
                    post.imageUrl?.startsWith('http') && post.imageUrl.trim()
                      ? post.imageUrl
                      : '/home.png'
                  }
                  alt={post.title}
                  width={280}
                  height={180}
                  className='w-full md:w-[280px] h-[180px] object-cover rounded-xl border'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/home.png';
                  }}
                  unoptimized
                />
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold mb-1'>{post.title}</h3>
                  <div className='flex flex-wrap gap-2 mb-2 text-xs'>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className='bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className='text-gray-600 text-sm line-clamp-3'>
                    {parseLexicalContent(post.content)}
                  </p>
                  <div className='mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500'>
                    <div className='flex items-center gap-2'>
                      <Image
                        src='/default-avatar.png'
                        alt='Author'
                        width={24}
                        height={24}
                        className='rounded-full'
                      />
                      <span>{post.author.name}</span>
                    </div>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center py-20 flex flex-col items-center'>
            <Image
              src='/no-result.png'
              alt='No Result'
              width={120}
              height={120}
            />
            <p className='mt-4 text-lg font-medium'>No results found</p>
            <p className='text-gray-500 mb-6'>Try using different keywords</p>
            <Link
              href='/'
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full'
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
