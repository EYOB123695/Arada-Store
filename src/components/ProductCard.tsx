"use client";

import Link from "next/link";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Product } from "@/lib/platzi-products";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop";
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Link href={`/products/${product.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </Link>

        {/* Category Badge Over Image */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200/50 shadow-sm">
          {product.category?.name || "General"}
        </span>

        {/* Quick View Button */}
        <Link
          href={`/products/${product.id}`}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-700 hover:text-indigo-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Eye className="h-4 w-4" />
        </Link>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Rating Stars */}
          <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            <span>4.8</span>
            <span className="text-gray-400 font-normal">(42 reviews)</span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 text-base line-clamp-1 hover:text-indigo-600 transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Product Description */}
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Add to Cart Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase font-medium">Price</span>
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>

          <Button
            onClick={() =>
              addItem({
                id: String(product.id),
                name: product.title,
                price: product.price,
                image: product.images[0] || "",
              })
            }
            size="sm"
            className="rounded-full gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </Button>

        </div>
      </div>
    </div>
  );
}
