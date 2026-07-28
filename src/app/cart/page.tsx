"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500 text-sm">Looks like you haven&apos;t added any products to your cart yet.</p>
            <Link href="/">
              <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-medium rounded-full"
              >
                Clear Cart
              </Button>
            </div>

            {/* List of Cart Items */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                  </div>

                  {/* Quantity Controls (+ / -) */}
                  <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-indigo-600 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="font-semibold text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-indigo-600 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <p className="font-bold text-gray-900 text-sm md:text-base w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout Row */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Amount</span>
                <p className="text-3xl font-extrabold text-indigo-600">${getTotalPrice().toFixed(2)}</p>
              </div>

              <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md shadow-indigo-100">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
