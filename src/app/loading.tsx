import SkeletonPostCard from "@/components/loading/SkeletonPostCard";

export default function Loading() {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {"abcdefghi".split('').map(i => (
          <SkeletonPostCard key={i} />
        ))}
      </div>
    </main>
  )
}