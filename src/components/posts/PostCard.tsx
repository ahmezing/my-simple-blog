import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold text-right">{post.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground text-right">
              بقلم: {post.author} • قراءته تستغرق {post.time_to_read} د 
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-foreground line-clamp-3 text-right">{post.body}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button>اقرأ المقال كاملًا</Button>
          <Badge variant="secondary">{formatDate(post.published_date)}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}