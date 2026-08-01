"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-16 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 text-center max-w-md mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
            <XCircle className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Payment Cancelled
            </h1>
            <p className="text-gray-500 text-sm">
              Your transaction was cancelled or failed to complete. No charges were made.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link href="/checkout" className="block">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 w-full font-semibold">
                Try Checkout Again
              </Button>
            </Link>

            <Link href="/cart" className="inline-flex items-center text-xs text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-3 w-3 mr-1" /> Return to Cart
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
