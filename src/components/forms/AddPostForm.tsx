'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePost } from '@/lib/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { postSchema, type PostFormValues } from '@/lib/validation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { calculateReadingTime } from '@/lib/utils';
import SkeletonPostDetail from '../loading/SkeletonPostDetail';

export default function AddPostForm() {
  const { mutate: createPost, isPending, error: submitError } = useCreatePost();
  const [charCount, setCharCount] = useState({ body: 0, title: 0, author: 0 });
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      body: '',
      author: '',
      time_to_read: 1,
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setCharCount({
        body: value.body?.length || 0,
        title: value.title?.length || 0,
        author: value.author?.length || 0,
      });
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  function onSubmit(data: PostFormValues) {
    setDisabled(true);
    const timeToRead = calculateReadingTime(data.body);
    createPost(
      {
        ...data,
        time_to_read: timeToRead,
        published_date: new Date().toISOString(),
      },
      {
        onSuccess: (newPost) => {
          router.push(`/posts/${newPost.id}`);
        },
        onError: () => {
          setDisabled(false);
        }
      }
    );
  }

  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              {submitError instanceof Error ? submitError.message : 'حدث خطأ أثناء نشر المقال'}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">عنوان المقال</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل عنوان المقال..."
                      className="text-right"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {charCount.title}/70 حرف
                  </FormDescription>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">اسم الكاتب</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل اسم الكاتب..."
                      className="text-right"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {charCount.author}/35 حرف
                  </FormDescription>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">محتوى المقال</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اكتب محتوى المقال هنا..."
                      className="text-right min-h-[200px]"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {charCount.body}/4000 حرف
                  </FormDescription>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Link href="/">
                <Button type="button" variant="outline" disabled={disabled}>
                  إلغاء
                </Button>
              </Link>
              <Button type="submit">
                {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                نشر المقال
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}