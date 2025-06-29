'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
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
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and content are required');

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (coverImage) formData.append('coverImage', coverImage);
    formData.append('tags', JSON.stringify(tags));

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
    } catch (err) {
      console.error(err);
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
            className='w-full border rounded-[12px] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
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
          {previewUrl ? (
            <div className='mb-2'>
              <Image
                src={previewUrl}
                alt='Cover Preview'
                width={600}
                height={300}
                className='rounded-md object-cover'
              />
              <div className='flex gap-4 mt-2'>
                <label
                  htmlFor='cover-upload'
                  className='text-blue-600 cursor-pointer'
                >
                  Change Image
                </label>
                <button
                  type='button'
                  className='text-red-500'
                  onClick={() => {
                    setCoverImage(null);
                    setPreviewUrl('');
                  }}
                >
                  Delete Image
                </button>
              </div>
            </div>
          ) : (
            <div className='border border-dashed rounded-[12px] p-6 text-center text-sm text-gray-500'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                hidden
                id='cover-upload'
              />
              <label
                htmlFor='cover-upload'
                className='cursor-pointer text-blue-600 font-medium'
              >
                Click to upload
              </label>
              <p className='text-xs mt-1 text-gray-400'>
                PNG or JPG (max. 5mb)
              </p>
            </div>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Tags</label>
          <div className='flex flex-wrap gap-2 mb-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='bg-gray-200 px-3 py-1 text-sm rounded-full flex items-center gap-2'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => removeTag(tag)}
                  className='text-gray-500 hover:text-red-500'
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type='text'
            onKeyDown={handleAddTag}
            placeholder='Enter your tags'
            className='w-full border rounded-[12px] px-4 py-2 text-sm'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-[#009DFB] text-white text-sm rounded-full'
            style={{ width: '265px', height: '44px' }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Finish'}
          </button>
        </div>
      </form>
    </div>
  );
}
