"use client";

import { Category } from "@/lib/platzi-products";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CategoryBarProps {
  categories: Category[];
  selectedCategoryId?: number | null;
  onSelectCategory?: (categoryId: number | null) => void;
}

export default function CategoryBar({
  categories,
  selectedCategoryId = null,
  onSelectCategory,
}: CategoryBarProps) {
  const router = useRouter();

  const handleSelect = (id: number | null) => {
    if (onSelectCategory) {
      onSelectCategory(id);
    } else {
      if (id === null) {
        router.push("/");
      } else {
        router.push(`/?category=${id}`);
      }
    }
  };

  return (
    <section id="categories" className="py-8 bg-gray-50/50 border-b">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Browse by Category
          </h2>
          {selectedCategoryId !== null && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSelect(null)}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear Filter
            </Button>
          )}
        </div>

        {/* Scrollable Pills Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* "All Products" Pill */}
          <Button
            variant={selectedCategoryId === null ? "default" : "outline"}
            onClick={() => handleSelect(null)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all shrink-0 ${
              selectedCategoryId === null
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Products
          </Button>

          {/* Dynamic Categories Pills */}
          {categories.map((category) => {
            const isSelected = selectedCategoryId === category.id;
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleSelect(category.id)}
                className={`rounded-full px-4 py-2 gap-2 text-sm font-medium transition-all shrink-0 ${
                  isSelected
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.image && (
                  <div className="relative h-5 w-5 rounded-full overflow-hidden shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}


