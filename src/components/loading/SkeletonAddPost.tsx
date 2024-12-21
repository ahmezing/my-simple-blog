import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonAddPost() {
  return (
    <main className="container mx-auto px-4">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mr-auto" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-24 mr-auto" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28 mr-auto" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-24 mr-auto" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-40 mr-auto" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mr-auto" />
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-4 w-24 mr-auto" />
          </div>

          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}