export interface Post {
  id: number;
  title: string;
  time_to_read: number;
  author: string;
  published_date: string;
  body: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export type SortOption = 'newest' | 'oldest' | 'shortest' | 'longest';