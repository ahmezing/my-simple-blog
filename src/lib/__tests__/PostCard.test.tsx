import { render, screen } from '@testing-library/react';
import PostCard from '@/components/posts/PostCard';

describe('PostCard', () => {
  const mockPost = {
    id: 1,
    title: 'عنوان المقال',
    body: 'محتوى المقال',
    author: 'الكاتب',
    published_date: '2024-12-20',
    time_to_read: 5,
  };

  test('renders post information correctly', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    expect(screen.getByText(/الكاتب/)).toBeInTheDocument();
    expect(screen.getByText(/قراءته تستغرق 5 د/)).toBeInTheDocument();
  });

  test('includes a link to the post detail page', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/posts/${mockPost.id}`);
  });
});