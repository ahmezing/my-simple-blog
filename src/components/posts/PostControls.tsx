'use client'; //csr
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
    from "@/components/ui/select";
import { SortOption } from '@/lib/types';
import { useDebounce } from '@/hooks/useDebounce';

export default function PostControls() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // States for search query and sort option
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [sortBy, setSortBy] = useState<SortOption>(
        (searchParams.get('sortBy') as SortOption) || 'newest'
    );

    // Debounce search input to reduce API calls
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
            <h1>المقالات</h1>
            <div className="flex items-center gap-4 md:flex-nowrap sm:justify-between">
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