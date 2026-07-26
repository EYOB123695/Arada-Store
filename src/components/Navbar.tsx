"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <ShoppingBag className="h-6 w-6 text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            PlatziStore
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden md:flex items-center w-full max-w-sm">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-full border-gray-300 focus-visible:ring-indigo-500"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-1 text-gray-500 hover:text-indigo-600"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Action Buttons: Wishlist, Cart & Profile */}
        <div className="flex items-center gap-3">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5 text-gray-700 hover:text-indigo-600" />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="outline" className="relative rounded-full gap-2 border-indigo-200 hover:border-indigo-500">
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/account">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5 text-gray-700 hover:text-indigo-600" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}