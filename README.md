# 🛒 Arada Store - E-Commerce Web Application

**Arada Store** is a modern, high-performance E-Commerce web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand**. It features dynamic product browsing, category filtering, search functionality, real-time persistent shopping cart management, and interactive product detail views.

---

##  Features

- **Product Catalog & Search**: Browse featured products, filter by category, and search by keywords in real-time.
-  **Persistent Shopping Cart**: State management powered by **Zustand** with `persist` middleware (`localStorage`), ensuring cart items, quantities, and totals remain intact across page reloads.
-  **Next.js App Router & SSR**: Fast server-side rendering and client-side navigation.
-  **Modern Design & UI Components**: Styled with Tailwind CSS, Lucide icons, and Shadcn UI.
-  **Form Validation**: Powered by React Hook Form & Zod for type-safe form validation.

---

##  Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

##  Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### Installation & Execution

1. Clone or navigate to the repository directory:
   ```bash
   cd Arada-store
   ```


2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

##  Project Structure

```
Arada-store/
├── src/
│   ├── app/
│   │   ├── (auth)/         # Authentication routes (login, register)
│   │   ├── cart/           # Shopping cart page (/cart)
│   │   ├── products/[id]/  # Product detail view page (/products/:id)
│   │   ├── globals.css     # Global Tailwind CSS styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage (Hero, Category bar, Product Grid)
│   ├── components/
│   │   ├── Navbar.tsx      # Top navigation with live cart count badge
│   │   ├── Footer.tsx      # Application footer
│   │   ├── ProductCard.tsx # Individual product display card with Add to Cart button
│   │   └── ui/             # Reusable UI components (buttons, inputs)
│   ├── lib/
│   │   └── platzi-products.ts # Product API / Mock Data fetching utilities
│   └── store/
│       └── useCartStore.ts # Zustand persistent store for cart state
```
