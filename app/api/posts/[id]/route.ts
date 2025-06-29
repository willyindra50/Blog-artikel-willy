import { NextResponse } from 'next/server';

const dummyPosts = [
  {
    id: '1',
    title: 'Judul Dummy',
    content: 'Ini konten dummy.',
    imageUrl: 'https://via.placeholder.com/800x400.png?text=Dummy',
    author: { name: 'Admin' },
    likes: 10,
    comments: 5,
    tags: ['test', 'dummy'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Artikel Lain',
    content: 'Ini adalah artikel lain untuk testing.',
    imageUrl: 'https://via.placeholder.com/800x400.png?text=Artikel+2',
    author: { name: 'Tester' },
    likes: 3,
    comments: 1,
    tags: ['artikel', 'testing'],
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  const filtered = dummyPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );
  });

  return NextResponse.json({ data: filtered });
}
