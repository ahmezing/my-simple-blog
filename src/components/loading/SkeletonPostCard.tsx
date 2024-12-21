import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonPostCard() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-6 w-3/4 sm:w-1/2 lg:w-3/4" />
          <Skeleton className="h-4 w-1/2 sm:w-1/3 lg:w-1/2 mt-2" />
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <Skeleton className="h-4 w-full sm:w-3/4 lg:w-full mt-2" />
        <Skeleton className="h-4 w-full sm:w-3/4 lg:w-full mt-4" />
        <Skeleton className="h-4 w-3/4 sm:w-1/2 lg:w-3/4 mt-4" />
      </CardContent>

      <CardFooter className="flex justify-between items-center mt-4">
        <Skeleton className="h-10 w-28 sm:w-32 lg:w-36" />
        <Skeleton className="h-6 w-20 sm:w-24 lg:w-28" />
      </CardFooter>
    </Card>
  );
}
