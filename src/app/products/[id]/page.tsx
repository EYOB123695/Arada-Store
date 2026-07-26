import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/auth/AuthGuard";
import ProductCard from "@/components/ProductCard";

import { getProduct, getProductsByCategory } from "@/lib/platzi-products";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Tag
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProductsByCategory(product.category.id);
  const filteredRelated = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const mainImage =
    product.images[0] ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <AuthGuard />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <div className="text-xs text-gray-400">
            Home / {product.category.name} / {product.title}
          </div>
        </div>

        {/* Product Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Left: Product Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {product.category.name}
                </span>
              </div>

              {/* Thumbnails preview */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 w-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.title} ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Controls */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-semibold">
                  <Tag className="h-3.5 w-3.5" />
                  In Stock
                </div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {product.title}
                </h1>

                {/* Rating Badges */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    4.8 (124 reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm pt-2">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all">
                    Buy Now
                  </button>
                </div>

                {/* Feature Value Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-gray-500 text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span>2 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {filteredRelated.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/?category=${product.category.id}`}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View More in {product.category.name} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRelated.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

