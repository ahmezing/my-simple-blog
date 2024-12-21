import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SkeletonPostDetail() {
  return (
    <main className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-6">
        <Button variant="ghost" disabled>
          <ArrowRight className="ml-2" />
          <Skeleton className="h-4 w-32" />
        </Button>
      </div>
      <Card className="mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <Badge variant="secondary">
              <Skeleton className="h-4 w-16" />
            </Badge>
            <CardDescription>
              <Skeleton className="h-4 w-20" />
            </CardDescription>
          </div>
          <CardTitle>
            <Skeleton className="h-6 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
