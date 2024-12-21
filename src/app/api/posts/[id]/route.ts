import { NextResponse } from 'next/server';
import { supabase } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return NextResponse.json(
        { message: 'فشل في جلب المنشور' },
        { status: 500 }
      );
    }

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