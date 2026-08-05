"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white dark:bg-gray-950 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 py-12 md:py-20 border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          {/* Promotional Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 ring-1 ring-inset ring-indigo-700/10 dark:ring-indigo-300/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>New Season Collections Available</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Discover Modern Style for{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Everyday Life
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl font-normal">
            Explore hundreds of premium products with fast shipping, secure checkout, and effortless returns.
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="#products">
              <Button size="lg" className="rounded-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 text-base font-semibold shadow-lg dark:shadow-none">
                Shop Collection
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#categories">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold border-gray-300 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900">
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100 dark:border-gray-800 w-full max-w-2xl mt-8">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Truck className="h-5 w-5 text-indigo-600" />
              <span>Free Delivery Worldwide</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <span>100% Secure Payment</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <RefreshCw className="h-5 w-5 text-indigo-600" />
              <span>Easy 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
