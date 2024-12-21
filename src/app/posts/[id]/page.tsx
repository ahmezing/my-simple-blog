import SkeletonPostDetail from "@/components/loading/SkeletonPostDetail";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPost, getPosts } from "@/lib/api";
import PostDetail from '../../../components/posts/PostDetail';
import { postKeys } from "@/lib/queries";
import { Suspense } from 'react';

// Generate static params for posts (ssg)
export async function generateStaticParams() {
  const response = await getPosts(1);
  return response.data.map((post) => ({
    id: post.id.toString(),
  }));
}

// Post detail page with ssr
export default async function PostPage({params}: { params: Promise<{ id: number }>  }) {
  const queryClient = new QueryClient();
  const { id } = await params;

  // Prefetch the post data
  await queryClient.prefetchQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SkeletonPostDetail />}>
        <PostDetail id={id} />
      </Suspense>
    </HydrationBoundary>
  );
}