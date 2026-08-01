"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const clearCart = useCartStore((state) => state.clearCart);

  const [verifying, setVerifying] = useState<boolean>(() => Boolean(tx_ref));
  const [paymentData, setPaymentData] = useState<{ amount?: string | number; currency?: string } | null>(null);

  useEffect(() => {
    if (!tx_ref) {
      return;
    }

    let isMounted = true;
    fetch(`/api/chapa/verify?tx_ref=${tx_ref}`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted && res.status === "success") {
          setPaymentData(res.data);
          clearCart();
        }
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) {
          setVerifying(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [tx_ref, clearCart]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 text-center max-w-md mx-auto shadow-sm space-y-6">
      {verifying ? (
        <div className="py-8 space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto" />
          <p className="text-gray-500 text-sm">Verifying your payment with Chapa...</p>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-gray-500 text-sm">
              Thank you for your purchase. Your payment was successfully processed via Chapa.
            </p>
          </div>

          {tx_ref && (
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl text-left text-xs space-y-2 font-mono text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Transaction Ref:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{tx_ref}</span>
              </div>
              {paymentData && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-semibold text-emerald-600">
                    {paymentData.amount} {paymentData.currency}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Link href="/" className="block w-full">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 w-full font-semibold">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-16 flex items-center justify-center">
        <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
