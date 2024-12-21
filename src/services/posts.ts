import { supabase } from '@/lib/database';
import { Post, PaginatedResponse, SortOption } from '@/lib/types';
import { postSchema } from '@/lib/validation';

const PAGE_SIZE = 6;

// Define the sorting options once to reuse
const sortOptions: Record<SortOption, { column: string; ascending: boolean }> = {
  newest: { column: 'published_date', ascending: false },
  oldest: { column: 'published_date', ascending: true },
  shortest: { column: 'time_to_read', ascending: true },
  longest: { column: 'time_to_read', ascending: false },
};

export async function getPostsFromDB(
  page = 1,
  sortBy: SortOption = 'newest',
  search?: string
): Promise<PaginatedResponse<Post>> {
  try {
    let query = supabase.from('posts').select('*', { count: 'exact' });

    // Add search filter if present
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply sorting
    if (sortOptions[sortBy]) {
      query = query.order(sortOptions[sortBy].column, {
        ascending: sortOptions[sortBy].ascending,
      });
    }

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;
    
    const { data: posts, error, count } = await query.range(start, end);

    if (error) throw error;

    return {
      data: posts || [],
      metadata: {
        total: count || 0,
        page,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil((count || 0) / PAGE_SIZE)
      }
    };
  } catch (error) {
    console.error('Error in getPostsFromDB:', error);
    return {
      data: [],
      metadata: {
        total: 0,
        page: 1,
        pageSize: PAGE_SIZE,
        totalPages: 0
      }
    };
  }
}

export async function getPostFromDB(id: number): Promise<Post | null> {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return post;
  } catch (error) {
    console.error('Error in getPostFromDB:', error);
    return null;
  }
}

export async function createPostInDB(postData: unknown) {
  try {
    const validationResult = postSchema.safeParse(postData);
    if (!validationResult.success) {
      throw new Error('Invalid post data');
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([validationResult.data])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error in createPostInDB:', error);
    throw error;
  }
}