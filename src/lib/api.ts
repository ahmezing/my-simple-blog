import { Post, PaginatedResponse, SortOption } from './types';
import { cache } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 6;

// Fetch paginated list of posts
export const getPosts = cache(async (
  page = 1,
  sortBy: SortOption = 'newest',
  search?: string
): Promise<PaginatedResponse<Post>> => {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: PAGE_SIZE.toString(),
    sortBy,
    ...(search && { search }),
  });

  const result = await fetch(`${baseUrl}/api/posts?${searchParams}`, {
    next: { revalidate: 3600 },
  });

  if (!result.ok) {
    throw new Error('حدث خطأ أثناء تحميل المقالات');
  }
  return result.json();
});

// Fetch details of a single post by ID
export const getPost = cache(async (id: number): Promise<Post> => {
  const result = await fetch(`${baseUrl}/api/posts/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!result.ok) {
    throw new Error('حدث خطأ أثناء تحميل المقال');
  }

  return result.json();
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
