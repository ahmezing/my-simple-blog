'use client';
import { useSearchParams } from 'next/navigation';
import { usePosts } from '@/lib/queries';
import PostCard from './PostCard';
import SkeletonPostCard from '../loading/SkeletonPostCard';
import PaginationControls from './PaginationControls';
import { SortOption } from '@/lib/types';

export default function PostList() {
  const searchParams = useSearchParams();
  const sortBy = (searchParams.get('sortBy') || 'newest') as SortOption;
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isFetching } = usePosts(page, sortBy, search);
  const { metadata } = data || {};
  const totalPages = metadata?.totalPages || 1;

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonPostCard key={i} />
        ))}
      </div>
    );
  }

  if (!data?.data.length) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">لا توجد مقالات</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <PaginationControls totalPages={totalPages} />
    </>
  );
}
