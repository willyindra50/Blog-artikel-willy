'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import API from '@/api';
import { parseLexicalContent } from '@/utils/parseLexicalContent';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function PostDetailPage() {
  const { id } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post-detail', id],
    queryFn: async () => {
      const res = await API.get(`/posts/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className='text-center py-10'>Loading...</div>;
  if (error || !post)
    return (
      <div className='text-center py-10 text-red-500'>Gagal ambil data.</div>
    );

  const comments = [
    {
      name: 'Clarissa',
      avatar: '/clarissa.png',
      date: '27 Maret 2025',
      text: 'This is super insightful — thanks for sharing!',
    },
    {
      name: 'Marco',
      avatar: '/marco.png',
      date: '27 Maret 2025',
      text: 'Exactly what I needed to read today. Frontend is evolving so fast!',
    },
    {
      name: 'Michael Sailor',
      avatar: '/michael.png',
      date: '27 Maret 2025',
      text: 'Great breakdown! You made complex ideas sound simple.',
    },
    {
      name: 'Jessica Jane',
      avatar: '/jessica.png',
      date: '27 Maret 2025',
      text: 'Thanks for this article, it really helped me understand frontend direction!',
    },
    {
      name: 'Alexandra',
      avatar: '/alexandra.png',
      date: '27 Maret 2025',
      text: 'Loved every paragraph. Clear and concise.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 py-10'>
        <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
        <div className='flex flex-wrap gap-2 mb-4'>
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600 mb-6'>
          <Image
            src='/default-avatar.png'
            alt='author'
            width={32}
            height={32}
            className='rounded-full object-cover'
          />
          <span className='font-medium'>{post.author.name}</span>
          <span className='text-gray-400'>•</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className='flex gap-4 text-sm text-gray-500 mb-6'>
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
        </div>
        <div className='w-full aspect-[16/9] md:h-[607px] relative rounded-xl overflow-hidden'>
          <Image
            src={
              post.imageUrl?.startsWith('http') && post.imageUrl.trim() !== ''
                ? post.imageUrl
                : '/home.png'
            }
            alt={post.title}
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='h-4' />
        <div className='text-[15px] leading-[28px] whitespace-pre-wrap text-gray-800'>
          {parseLexicalContent(post.content)}
        </div>

        <div className='mt-12'>
          <h3 className='text-xl font-semibold mb-4'>Comments(5)</h3>

          <div className='flex items-start gap-3 mb-6'>
            <Image
              src='/default-avatar.png'
              alt='avatar'
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
            <div className='flex-1'>
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Enter your comment'
                className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button className='mt-2 px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600'>
                Send
              </button>
            </div>
          </div>

          <div className='space-y-6'>
            {comments.slice(0, 3).map((comment, i) => (
              <div key={i} className='flex items-start gap-3'>
                <Image
                  src={comment.avatar}
                  alt={comment.name}
                  width={40}
                  height={40}
                  className='rounded-full object-cover'
                />
                <div>
                  <p className='font-semibold text-sm'>{comment.name}</p>
                  <p className='text-xs text-gray-500 mb-1'>{comment.date}</p>
                  <p className='text-sm'>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-4'>
            <button
              className='text-sm text-blue-600 hover:underline font-medium'
              onClick={() => setShowComments(true)}
            >
              See All Comments
            </button>
          </div>
        </div>

        <div className='mt-16 border-t pt-8'>
          <h3 className='text-xl font-semibold mb-4'>Another Post</h3>
          <div className='flex gap-4'>
            <Image
              src={
                post.imageUrl?.startsWith('http') ? post.imageUrl : '/home.png'
              }
              alt={post.title}
              width={160}
              height={160}
              className='rounded-md object-cover w-[160px] h-[120px]'
            />
            <div className='flex flex-col justify-between'>
              <h4 className='text-md font-semibold mb-1 line-clamp-2'>
                {post.title}
              </h4>
              <div className='flex flex-wrap gap-2 text-xs mb-1'>
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className='bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className='text-sm text-gray-600 line-clamp-2 mb-1'>
                {parseLexicalContent(post.content)}
              </p>
              <div className='text-xs text-gray-500 flex gap-3'>
                <span>{post.author.name}</span>
                <span>•</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Comments */}
      {showComments && (
        <div className='fixed inset-0 z-50 bg-black/30 flex justify-center items-center'>
          <div className='bg-white max-w-lg w-full rounded-xl p-6 shadow-lg overflow-y-auto max-h-[80vh]'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Comments(5)</h3>
              <button onClick={() => setShowComments(false)}>✖</button>
            </div>
            {/* Modal Comment Form */}
            <div className='flex items-start gap-3 mb-6'>
              <Image
                src='/default-avatar.png'
                alt='avatar'
                width={40}
                height={40}
                className='rounded-full object-cover'
              />
              <div className='flex-1'>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Enter your comment'
                  className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button className='mt-2 px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600'>
                  Send
                </button>
              </div>
            </div>
            <div className='space-y-6'>
              {comments.map((comment, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <Image
                    src={comment.avatar}
                    alt={comment.name}
                    width={40}
                    height={40}
                    className='rounded-full object-cover'
                  />
                  <div>
                    <p className='font-semibold text-sm'>{comment.name}</p>
                    <p className='text-xs text-gray-500 mb-1'>{comment.date}</p>
                    <p className='text-sm'>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
