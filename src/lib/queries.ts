import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, getPost, createPost } from './api';
import { toast } from 'react-toastify';
import { SortOption } from './types';

export const postKeys = {
  all: ['posts'] as const,
  list: (page: number, sortBy: SortOption, search?: string) => 
    [...postKeys.all, 'list', page, sortBy, search] as const,
  detail: (id: number) => ['posts', id] as const,
};

export function usePosts(page: number, sortBy: SortOption, search?: string) {
  return useQuery({
    queryKey: postKeys.list(page, sortBy, search),
    queryFn: () => getPosts(page, sortBy, search),
    staleTime: Infinity,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    staleTime: Infinity,
  });
}

export function useCreatePost() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createPost,
      onSuccess: (newPost) => {
        queryClient.invalidateQueries({ queryKey: postKeys.all });
        toast.success('تم نشر المقال بنجاح');
      },
      onError: (error: any) => {
        if (error.response?.status === 400) {
          toast.error('البيانات المدخلة غير صالحة، يرجى التحقق من المدخلات');
        } else {
          toast.error('حدث خطأ أثناء نشر المقال');
        }
      },
    });
  }