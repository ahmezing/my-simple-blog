import { Post, PaginatedResponse, SortOption } from './types';
import { cache } from 'react';
import { getPostFromDB, getPostsFromDB } from '@/services/posts';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const isBuildTime = () => process.env.NODE_ENV === 'production' && !baseUrl;

export const getPosts = cache(async (
  page = 1,
  sortBy: SortOption = 'newest',
  search?: string
): Promise<PaginatedResponse<Post>> => {
  if (isBuildTime()) {
    return getPostsFromDB(page, sortBy, search);
  }

  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: '6',
    sortBy,
    ...(search && { search }),
  });

  try {
    const result = await fetch(`${baseUrl}/api/posts?${searchParams}`, {
      next: { revalidate: 3600 },
    });

    if (!result.ok) throw new Error('Failed to fetch posts');
    return result.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return getPostsFromDB(page, sortBy, search);
  }
});

export const getPost = cache(async (id: number): Promise<Post | null> => {
  if (isBuildTime()) {
    return getPostFromDB(id);
  }

  try {
    const result = await fetch(`${baseUrl}/api/posts/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!result.ok) throw new Error('Failed to fetch post');
    return result.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return getPostFromDB(id);
  }
});

// Create a new post
export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const result = await fetch(`${baseUrl}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  if (!result.ok) {
    throw new Error('حدث خطأ أثناء نشر المقال');
  }

  return result.json();
}
