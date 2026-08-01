# 🛒 Arada Store - E-Commerce Web Application

**Arada Store** is a modern, high-performance E-Commerce web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand**. It features dynamic product browsing, category filtering, search functionality, real-time persistent shopping cart management, and interactive product detail views.

---

## 🚀 Features

- 🛍️ **Product Catalog & Real-Time Search**: Browse products, filter by dynamic categories, and search by keywords instantly.
- 🛒 **Persistent Shopping Cart**: Global state management using **Zustand** with `persist` middleware (`localStorage`), preserving selected items, item quantities, and subtotal across sessions.
- 🔐 **User Authentication**: Secure Login and Registration pages (`/login`, `/register`) with schema-validated forms powered by **React Hook Form** & **Zod**.
- 💳 **Payment Gateway Integration**: Integrated checkout and payment processing capabilities for seamless transactions.
- 🌗 **Dark Mode & Responsive UI**: Interactive theme switching (Light / Dark mode) with standard UI components styled via **Tailwind CSS v4** and **Lucide React**.
- ⚡ **Next.js App Router & SSR**: Fast client-side navigation combined with optimized server-side rendering.

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
│   │   └── products.ts     # Product API / Data fetching utilities
│   └── store/
│       └── useCartStore.ts # Zustand persistent store for cart state
```
