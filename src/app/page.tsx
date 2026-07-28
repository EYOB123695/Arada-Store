import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryBar from "@/components/categoryBar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/auth/AuthGuard";

import {
  getProducts,
  getCategories,
  searchProducts,
  getProductsByCategory,
} from "@/lib/platzi-products";

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function HomePage({searchParams}: HomePageProps) {

   const params = await searchParams ;
   const search = params?.search || "" ;
   const category =params?.category || "" ; 
   const categoryId = category ? parseInt(category, 10) : null ; 

   // fetch categories list 
   const categoriesPromise = getCategories();
   // Fetch products based on search query or category selection
  let productsPromise;
  if (search.trim()) {
    productsPromise = searchProducts(search.trim());
  } else if (categoryId) {
    productsPromise = getProductsByCategory(categoryId);
  } else {
    productsPromise = getProducts(20);
  }

  const [categories, products] = await Promise.all([categoriesPromise, productsPromise]);

     return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
      <AuthGuard />
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <CategoryBar
          categories={categories}
          selectedCategoryId={categoryId}
        />
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}




