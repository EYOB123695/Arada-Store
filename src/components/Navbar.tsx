"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Heart, User, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/useCartStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getUserProfile, UserProfile } from "@/lib/platzi-auth";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("platzi_access_token");
    if (token) {
      getUserProfile(token)
        .then((profile) => setUser(profile))
        .catch(() => {
          localStorage.removeItem("platzi_access_token");
          localStorage.removeItem("platzi_refresh_token");
          setUser(null);
        })
        .finally(() => setIsLoadingUser(false));
    } else {
      queueMicrotask(() => setIsLoadingUser(false));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("platzi_access_token");
    localStorage.removeItem("platzi_refresh_token");
    setUser(null);
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const totalItems = useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().getTotalItems(),
    () => 0
  );

  const displayCartCount = totalItems > 0 ? totalItems : cartCount;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <ShoppingBag className="h-6 w-6 text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            AradaStore
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
          <ThemeToggle />

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-indigo-600" />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="outline" className="relative rounded-full gap-2 border-indigo-200 hover:border-indigo-500">
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {displayCartCount}
                </span>
              )}
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              <span className="hidden sm:inline font-medium">Cart</span>
            </Button>
          </Link>

          {/* User Auth Session Header Area */}
          {!isLoadingUser && (
            user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-gray-200/80 dark:border-gray-700/80 transition-all duration-200 shadow-sm"
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={user.avatar || "https://picsum.photos/800"}
                      alt={user.name || "User Profile"}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/80 group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900" />
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {(user.name || "User").split(" ")[0]}
                  </span>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Sign Out"
                  className="rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  className="rounded-full bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 shadow-md shadow-indigo-500/20 gap-2 transition-all"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}