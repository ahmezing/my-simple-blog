import { NextResponse } from 'next/server';
import { supabase } from '@/lib/database';
import { postSchema } from '@/lib/validation';
import { SortOption } from '@/lib/types';


// Handles fetching paginated posts from the database

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '6');
    const sortBy = (searchParams.get('sortBy') || 'newest') as SortOption;
    const search = searchParams.get('search') || '';

    let query = supabase.from('posts').select('*', { count: 'exact' });

    // Add search filter if present
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Define sorting options
    const sortOptions: Record<SortOption, { column: string; ascending: boolean }> = {
      newest: { column: 'published_date', ascending: false },
      oldest: { column: 'published_date', ascending: true },
      shortest: { column: 'time_to_read', ascending: true },
      longest: { column: 'time_to_read', ascending: false },
    };

    // Apply sorting
    if (sortOptions[sortBy]) {
      query = query.order(sortOptions[sortBy].column, {
        ascending: sortOptions[sortBy].ascending,
      });
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    
    // Finally callingh the query
    const { data: posts, error, count } = await query.range(start, end);

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json({ message: 'فشل في جلب المقالات' }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return NextResponse.json({
      data: posts,
      metadata: {
        totalPages,
        currentPage: page,
        pageSize,
        total: count,
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'خطأ في الخادم' }, { status: 500 });
  }
}


// Handles creating a new post
export async function POST(request: Request) {
  try {
    const post = await request.json();

    const validationResult = postSchema.safeParse(post);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'بيانات غير صالحة',
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([validationResult.data])
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json(
        { message: 'فشل في إنشاء المقال' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'خطأ في الخادم' },
      { status: 500 }
    );
  }
}