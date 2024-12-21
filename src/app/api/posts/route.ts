import { NextResponse } from 'next/server';
import { getPostsFromDB, createPostInDB } from '@/services/posts';
import { SortOption } from '@/lib/types';

// Handles fetching paginated posts from the database
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const sortBy = (searchParams.get('sortBy') || 'newest') as SortOption;
    const search = searchParams.get('search') || '';

    const response = await getPostsFromDB(page, sortBy, search);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'خطأ في الخادم' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const postData = await request.json();
    const post = await createPostInDB(postData);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in API route:', error);
    if (error instanceof Error && error.message === 'Invalid post data') {
      return NextResponse.json({ message: 'بيانات غير صالحة' }, { status: 400 });
    }
    return NextResponse.json({ message: 'خطأ في الخادم' }, { status: 500 });
  }
}