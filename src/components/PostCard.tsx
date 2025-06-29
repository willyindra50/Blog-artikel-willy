interface PostCardProps {
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
}

export default function PostCard({
  title,
  slug,
  thumbnail,
  excerpt,
}: PostCardProps) {
  return (
    <div className='border rounded-lg shadow-md overflow-hidden'>
      <img src={thumbnail} alt={title} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <p
          className='text-sm text-gray-600 mb-2'
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <a
          href={`/post/${slug}`}
          className='text-blue-600 hover:underline text-sm'
        >
          Read More →
        </a>
      </div>
    </div>
  );
}
