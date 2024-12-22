'use client'

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full max-w-full bg-primary/90 text-primary-foreground shadow-md border-b border-border">
      <div className="container h-16 px-4 md:px-6 max-w-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" prefetch={false}>
            <div className="flex-1">
              <span className="text-lg font-bold tracking-wider">مدونة أسفار</span>
            </div>
          </Link>
          <nav className="hidden md:flex flex-1 justify-end items-center gap-6">
            <Link
              href="/"
              className="text-md font-medium hover:text-primary-500 transition-all duration-300 ease-in-out"
              prefetch={false}
            >
              الصفحة الرئيسية
            </Link>
            <Link
              href="/add-post"
              className="text-md font-medium hover:text-primary-500 transition-all duration-300 ease-in-out"
              prefetch={false}
            >
              كتابة مقال جديد
            </Link>
          </nav>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="فتح القائمة">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full bg-secondary text-secondary-foreground">
              <div className="flex justify-between items-center">
                <SheetTitle className="text-right">مدونة أسفار</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="إغلاق القائمة"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium text-right hover:underline underline-offset-4"
                  prefetch={false}
                  onClick={handleLinkClick}
                >
                  الصفحة الرئيسية
                </Link>
                <Link
                  href="/add-post"
                  className="text-lg font-medium text-right hover:underline underline-offset-4"
                  prefetch={false}
                  onClick={handleLinkClick}
                >
                  كتابة مقال جديد
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}