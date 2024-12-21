import { NextResponse } from 'next/server';
import { getPostFromDB } from '@/services/posts';

export async function GET(request: Request, {params}: { params: Promise<{ id: number }> }) {
  try {
    const { id } = await params;

    if (isNaN(id)) {
      return NextResponse.json(
        { message: 'معرف غير صالح' },
        { status: 400 }
      );
    }

    const post = await getPostFromDB(id);

    if (!post) {
      return NextResponse.json(
        { message: 'المنشور غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}