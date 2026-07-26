import Link from "next/link";
import { ShoppingBag, Send, Globe, Mail, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() { 
    return (
        <footer className ="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className = "container px-4 md:px-8 mx-auto py-12 md:py-16">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
         {/* Column 1: Brand Logo & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <ShoppingBag className="h-6 w-6 text-indigo-400" />
              <span>PlatziStore</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for modern lifestyle essentials. Powered by high-speed Next.js server components and real-time API integrations.
            </p>
                        {/* Social & Contact Icons */}
            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-indigo-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>

          </div>
                    {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Browse Categories</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Featured Deals</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div> 
                     {/* Column 3: Customer Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Stay in the Loop
            </h3>
            <p className="text-sm text-gray-400">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500"
              />
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} PlatziStore Inc. All rights reserved.</p>
          <p>Built with Next.js App Router, Tailwind CSS & Platzi API.</p>
        </div>
      </div>
    </footer>
  );
}