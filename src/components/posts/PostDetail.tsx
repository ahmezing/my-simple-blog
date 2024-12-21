'use client';

import { usePost } from '@/lib/queries';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PostDetail({ id }: { id: number }) {
  const { data: post, error } = usePost(id);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          حدث خطأ أثناء تحميل المقال. الرجاء المحاولة مرة أخرى لاحقاً.
        </AlertDescription>
      </Alert>
    );
  }

  if (!post) return null;

  return (
    <main className="container mx-auto px-4 py-8" dir="rtl">
      <Link href="/" className="group">
        <div className="mb-6 flex items-center">
          <ArrowRight className="ml-2" />
          <span className="transition-all group-hover:translate-x-1 group-hover:reflect">عودة إلى المقالات</span>
        </div>
      </Link>
      <Card className="mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="secondary">
              {formatDate(post.published_date)}
            </Badge>
            <CardDescription>
              يُقرأ في {post.time_to_read} د
            </CardDescription>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <CardDescription className="text-lg">
            كتابة: {post.author}
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-right">{post.body}</div>
        </CardContent>
      </Card>
    </main>
  );
}
