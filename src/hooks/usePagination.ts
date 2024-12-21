import { useState, useEffect } from 'react';

/**
 * A custom hook to handle pagination.
 * 
 * @param totalPages - Total number of pages.
 * @param currentPage - The current page number (default is 1).
 * @param maxVisiblePages - The maximum number of pages to show (default is 5).
 * 
 * @returns - currentPage (the current page), getPageNumbers (pages to display), handlePageChange (to change the page).
 * 
 * This hook helps to calculate which page numbers to show and allows for changing the current page.
 */
export function usePagination(totalPages: number, currentPage: number = 1, maxVisiblePages: number = 5) {
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    const getPageNumbers = () => {
        const pages: number[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (page > 3) pages.push(-1); // Ellipsis before
            for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
                pages.push(i);
            }
            if (page < totalPages - 2) pages.push(-1); // Ellipsis after
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return { currentPage: page, getPageNumbers, handlePageChange };
}  