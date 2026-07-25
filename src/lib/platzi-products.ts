export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  }
  images: string[];

}

export interface Category {
  id: number;
  name: string;
  image: string;
}

const PLATZI_API_URL = "https://api.escuelajs.co/api/v1";

/** 
 * Cleans image URLs returned by Platzi API
 */
export function sanitizeImageUrl(url: string): string {
  if (!url) return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop";
  let cleaned = url.replace(/^[\["']+|[\]"']+$/g, "");
  if (!cleaned.startsWith("http")) {
    cleaned = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop";
  }
  return cleaned;
}

/**
 * Fetch products list (Server Component friendly with 60s cache)
 */
export async function getProducts(limit: number = 20): Promise<Product[]> {
  try {
    const res = await fetch(`${PLATZI_API_URL}/products?offset=0&limit=${limit}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const data: Product[] = await res.json();

    return data.map((product) => ({
      ...product,
      images: product.images.map(sanitizeImageUrl),
      category: {
        ...product.category,
        image: sanitizeImageUrl(product.category.image),
      },
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProduct(id: string | number): Promise<Product | null> {
  try {
    const res = await fetch(`${PLATZI_API_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const product: Product = await res.json();

    return {
      ...product,
      images: product.images.map(sanitizeImageUrl),
      category: {
        ...product.category,
        image: sanitizeImageUrl(product.category.image),
      },
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${PLATZI_API_URL}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories ${res.statusText}`);
    }

    const categories: Category[] = await res.json();

    return categories.map((cat) => ({
      ...cat,
      image: sanitizeImageUrl(cat.image),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}  

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const res = await fetch(`${PLATZI_API_URL}/categories/${categoryId}/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch category products: ${res.statusText}`);
    }

    const data: Product[] = await res.json();

    return data.map((product) => ({
      ...product,
      images: product.images.map(sanitizeImageUrl),
      category: {
        ...product.category,
        image: sanitizeImageUrl(product.category.image),
      },
    }));
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return [];
  }
}


export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const res = await fetch(`${PLATZI_API_URL}/products/?title=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to search products: ${res.statusText}`);
    }

    const data: Product[] = await res.json();

    return data.map((product) => ({
      ...product,
      images: product.images.map(sanitizeImageUrl),
      category: {
        ...product.category,
        image: sanitizeImageUrl(product.category.image),
      },
    }));
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    return [];
  }
}

















