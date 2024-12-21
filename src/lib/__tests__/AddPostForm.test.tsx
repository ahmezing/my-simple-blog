import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPostForm from '@/components/forms/AddPostForm';
import { useCreatePost } from '@/lib/queries';

jest.mock('@/lib/queries', () => ({
  useCreatePost: jest.fn(),
}));

describe('AddPostForm', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useCreatePost as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
  });

  test('calculates reading time based on body length', async () => {
    render(<AddPostForm />);

    await userEvent.type(screen.getByLabelText(/عنوان المقال/), 'عنوان تجريبي');
    await userEvent.type(screen.getByLabelText(/اسم الكاتب/), 'كاتب تجريبي');
    await userEvent.type(
      screen.getByLabelText(/محتوى المقال/),
      'هذه جملة تحتوي على عدد كبير من الكلمات لقياس وقت القراءة.'
    );

    const submitButton = screen.getByText(/نشر المقال/);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'عنوان تجريبي',
          author: 'كاتب تجريبي',
          body: 'هذه جملة تحتوي على عدد كبير من الكلمات لقياس وقت القراءة.',
          time_to_read: expect.any(Number),
          published_date: expect.any(String),
        }),
        expect.any(Object)
      );
    });
  });
});