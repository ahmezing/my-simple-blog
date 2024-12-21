import { Suspense } from 'react';
import { getPosts } from '@/lib/api';
import PostList from '@/components/posts/PostList';
import SkeletonPostCard from '@/components/loading/SkeletonPostCard';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { postKeys } from '@/lib/queries';
import PostControls from '@/components/posts/PostControls';

export default async function Home() {
  // Initialize a new QueryClient (react query) for fetching data.
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: postKeys.list(1, 'newest', ''),
    queryFn: () => getPosts(1, 'newest', ''),
  });

  return (
    <main className="container mx-auto px-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostControls />
        <Suspense fallback={<PostsSkeleton />}>
          <PostList />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}

// Skeleton UI for loading posts
function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto mt-8">
      {[...Array(6)].map((_, i) => (
        <SkeletonPostCard key={i} />
      ))}
    </div>
  );
}