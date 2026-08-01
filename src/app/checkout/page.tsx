"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChapaPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chapa/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amount: getTotalPrice(),
          currency: "ETB",
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Payment initialization failed");
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("No checkout URL returned from Chapa");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during payment processing");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <Navbar />
        <main className="flex-1 max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
          <p className="text-gray-500 text-sm">Please add items to your cart before checking out.</p>
          <Link href="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Browse Products
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Checkout with Chapa</h1>
              <p className="text-xs text-gray-500 mt-1">
                Pay securely using Telebirr, CBE Birr, or Cards via Chapa.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleChapaPay} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Abebe"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Bikila"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abebe@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                  Phone Number (Telebirr) *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="0912345678"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Redirecting to Chapa...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Pay ETB {getTotalPrice().toFixed(2)} with Chapa
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>256-Bit Encrypted & Secure Payment by Chapa</span>
              </div>
            </form>
          </div>

          {/* Mini Order Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm h-fit space-y-4">
            <h3 className="font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">
              Order Summary
            </h3>

            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-gray-500">{item.quantity}x</span>
                    <span className="line-clamp-1 max-w-[120px]">{item.name}</span>
                  </div>
                  <span className="font-medium">ETB {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2 text-sm">
              <div className="flex justify-between font-bold text-base text-indigo-600">
                <span>Total Amount</span>
                <span>ETB {getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
