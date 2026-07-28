"use client" ; 
import { Product } from "@/lib/platzi-products";
import ProductCard from "@/components/ProductCard";
import { PackageSearch } from "lucide-react";

interface ProductGridProps { 
    products :Product[]; 
    isLoading? : boolean ;
}

export default function ProductGrid({ 
    products, 
    isLoading = false,
}: ProductGridProps) { 
    return (
        <section id = "products" className = "py-12 bg-white">
            <div className ="container px-4 md:px-8 mx-auto">
                {/* Section Header */}
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                   <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Featured Products
            </h2>

             <p className = "text-sm text-gray-500 mt-1">
                 Explore our handpicked selection of top-quality items

             </p>


                 </div>
                 <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100">
            {products.length} Products
          </span>

                 </div>

                 {/* Empty State Fallback */}
        {!isLoading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <PackageSearch className="h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900">No Products Found</h3>
            <p className="text-sm text-gray-500 max-w-sm mt-1">
              We couldn&apos;t find any products matching your selected filter or search query. Try clearing your search or filters.
            </p>
          </div>
        )}
        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           
         {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>





                

                </div>
                </section>

        
    );
}