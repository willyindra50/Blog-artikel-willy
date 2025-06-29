'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import API from '@/api';
import { parseLexicalContent } from '@/utils/parseLexicalContent';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: { id: number; name: string };
  createdAt: string;
  likes: number;
  comments: number;
}

const POSTS_PER_PAGE = 5;

const fetchRecommendedPosts = async (page: number): Promise<Post[]> => {
  const res = await API.get(
    `/posts/recommended?page=${page}&limit=${POSTS_PER_PAGE}`
  );
  return res.data.data;
};

const fetchMostLikedPosts = async (): Promise<Post[]> => {
  const res = await API.get('/posts/most-liked');
  return res.data.data;
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const { data: recommended, isLoading: loadingRecommended } = useQuery({
    queryKey: ['recommended-posts', currentPage],
    queryFn: () => fetchRecommendedPosts(currentPage),
  });

  const { data: mostLiked, isLoading: loadingMostLiked } = useQuery({
    queryKey: ['most-liked-posts'],
    queryFn: fetchMostLikedPosts,
  });

  if (loadingRecommended || loadingMostLiked)
    return <div className='text-center py-10'>Loading...</div>;

  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[807px_1px_1fr] gap-8'>
        {/* Recommended Posts */}
        <section>
          <h2 className='text-2xl font-semibold mb-4'>Recommended for You</h2>
          <div className='space-y-14'>
            {recommended?.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className='block'>
                <article className='flex flex-col md:flex-row border-b border-gray-200 gap-4'>
                  <ImageWithFallback
                    src={
                      post.imageUrl?.startsWith('http') &&
                      post.imageUrl.trim() !== ''
                        ? post.imageUrl
                        : '/home.png'
                    }
                    alt={post.title}
                    width={340}
                    height={258}
                    className='w-full md:w-[340px] h-auto md:h-[258px] object-cover rounded-md aspect-[4/3]'
                    unoptimized
                  />
                  <div className='flex-1 flex flex-col justify-between py-2'>
                    <div>
                      <h3 className='text-lg font-semibold mb-1 line-clamp-2'>
                        {post.title}
                      </h3>
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
                      <p className='text-sm text-gray-600 line-clamp-4'>
                        {parseLexicalContent(post.content)}
                      </p>
                    </div>
                    <div className='flex gap-4 text-xs text-gray-500 mt-3'>
                      <span>{post.author.name}</span>
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Vertical Divider */}
        <div className='hidden md:block w-px bg-gray-300'></div>

        {/* Most Liked Sidebar */}
        <aside className='space-y-10'>
          <h3 className='text-lg font-semibold mb-2'>Most Liked</h3>
          {mostLiked?.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className='pb-4 border-b border-gray-200 space-y-1'
            >
              <p className='font-semibold text-sm line-clamp-2'>{post.title}</p>
              <p className='text-gray-600 text-xs line-clamp-2'>
                {parseLexicalContent(post.content)}
              </p>
              <div className='flex gap-4 text-gray-500 text-xs pt-1'>
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          ))}
        </aside>
      </main>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
