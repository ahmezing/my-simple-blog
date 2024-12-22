'use client'; //csr
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { SortOption } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';
import { Plus } from 'lucide-react';

export default function PostControls() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState<SortOption>(
        (searchParams.get('sortBy') as SortOption) || 'newest'
    );

    const debouncedSearch = useDebounce(search, 300);

    // Update query parameters on change
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }
        params.set('sortBy', sortBy);
        params.set('page', '1'); // Resets to first page
        router.push(`?${params.toString()}`);
    }, [debouncedSearch, sortBy]);

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold primary">المقالات</h1>
                <Link href="/add-post" className="md:hidden">
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        مقال جديد
                    </Button>
                </Link>
            </div>
            <div className="flex flex-row gap-4 sm:flex-row sm:items-center justify-between">
                <Input
                    type="search"
                    placeholder="ابحث عن مقال..."
                    className="max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="oldest">الأقدم</SelectItem>
                        <SelectItem value="shortest">الأقصر</SelectItem>
                        <SelectItem value="longest">الأطول</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}