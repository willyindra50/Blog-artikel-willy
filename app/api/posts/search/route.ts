import { NextResponse } from 'next/server';

const dummyPost = {
  id: '1',
  title: '5 Reasons to Learn Frontend Development in 2025',
  content:
    "Frontend development is more than just building beautiful user interfaces — it's about crafting user experiences that are fast, accessible, and intuitive.",
  imageUrl: 'https://via.placeholder.com/800x400.png?text=Frontend+Developer',
  author: { id: 1, name: 'Admin' },
  likes: 42,
  comments: 8,
  tags: ['frontend', 'developer', 'web'],
  createdAt: new Date().toISOString(),
};

const allowedKeywords = [
  'frontend',
  'developer',
  'web',
  'pizza',
  'html',
  'css',
  'javascript',
  'learn',
  'reasons',
  '2025',
  'how',
  'tes',
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.toLowerCase() || '';

    const isAllowed = allowedKeywords.some((keyword) => q.includes(keyword));

    const result = isAllowed ? [dummyPost] : [];

    return NextResponse.json({ data: result });
  } catch (err) {
    const error = err as Error;
    console.error('Search API error:', error.message);

    return NextResponse.json(
      { message: 'Failed to fetch search result', error: error.message },
      { status: 500 }
    );
  }
}
