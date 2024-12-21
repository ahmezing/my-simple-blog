import { Suspense } from 'react';
import AddPostForm from '../../components/forms/AddPostForm';
import SkeletonAddPost from '@/components/loading/SkeletonAddPost';

// AddPostPage renders the component for creating a new post
export default function AddPostPage() {
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-right">كتابة مقال جديد</h1>
      <Suspense fallback={<SkeletonAddPost />}>
        <AddPostForm />
      </Suspense>
    </main>
  );
}
