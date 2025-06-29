// app/write-post/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const LexicalEditor = dynamic(() => import('@/components/LexicalEditor'), {
  ssr: false,
});

export default function WritePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required');

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (coverImage) formData.append('coverImage', coverImage);
    formData.append('tags', tags);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to submit post');
      router.push('/');
    } catch {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <h1 className='text-2xl font-semibold mb-6'>Write Post</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium mb-1'>Title</label>
          <input
            type='text'
            className='w-full border rounded-md px-4 py-2'
            placeholder='Enter your title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Content</label>
          <LexicalEditor onChange={setContent} />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Cover Image</label>
          {previewUrl && (
            <Image
              src={previewUrl}
              alt='Cover Preview'
              width={400}
              height={200}
              className='mb-2 rounded-md object-cover'
            />
          )}
          <input type='file' accept='image/*' onChange={handleImageChange} />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Tags</label>
          <input
            type='text'
            className='w-full border rounded-md px-4 py-2'
            placeholder='e.g. frontend, javascript'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700'
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Finish'}
        </button>
      </form>
    </div>
  );
}
