"use client";

import {useEffect, useState } from "react" ; 
import {useRouter} from "next/navigation"; 

import {getUserProfile ,UserProfile}  from  "@/lib/platzi-auth" ; 

import { User, Mail, Shield, LogOut, ShoppingBag, Loader2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function ProfilePage() { 
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    useEffect (() => {
        const token = localStorage.getItem("platzi_access_token");
        if (!token) {
      // 💬 If user is unauthenticated
      router.push("/login");
      // 💬 Redirects immediately to login page
      return;
    }
     getUserProfile(token)
      // 💬 Requests profile data from API using JWT token
      .then((data) => {
        setUser(data);
        // 💬 Saves user profile data into state
        setLoading(false);
        // 💬 Stops loading spinner
      })
      .catch((err) => {
        // 💬 Handles token expiration or network error
        console.error("Failed to load user profile:", err);
        localStorage.removeItem("platzi_access_token");
        // 💬 Clears invalid access token
        localStorage.removeItem("platzi_refresh_token");
        // 💬 Clears invalid refresh token
        setError("Your session has expired. Please sign in again.");
        // 💬 Sets user-friendly error message
        setLoading(false);
        // 💬 Stops loading spinner
      });
  }, [router]);

const handleLogout = () => {
    // 💬 Sign-out action handler
    localStorage.removeItem("platzi_access_token");
    // 💬 Removes access token
    localStorage.removeItem("platzi_refresh_token");
    // 💬 Removes refresh token
    router.push("/login");
    // 💬 Redirects back to login route
  };
  if (loading) {
    // 💬 Renders full-height spinner while loading session data
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        {/* 💬 Spinning indigo loading icon */}
        <p className="text-gray-500 text-sm">Loading user session...</p>
      </div>
    );
  }
  if (error || !user) {
    // 💬 Renders error UI if session expired or failed
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <div className="p-4 rounded-full bg-red-50 text-red-600">
          <User className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold">Session Expired</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm">{error || "Unable to load profile."}</p>
        <Link href="/login">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
            Go to Login
          </Button>
          {/* 💬 Redirect button to login page */}
        </Link>
      </div>
    );
  }
  return (
    <main className="container max-w-4xl mx-auto py-10 px-4">
      {/* 💬 Main profile container */}
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 h-36 rounded-t-3xl relative">
        {/* 💬 Decorative gradient top cover banner */}
        <div className="absolute -bottom-10 left-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar || "https://picsum.photos/800"}
            alt={user.name || "User Avatar"}
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-lg bg-white"
          />
          {/* 💬 Large circular user avatar picture positioned over banner */}
        </div>
      </div>
      {/* Main Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-b-3xl border-x border-b border-gray-200 dark:border-gray-800 p-8 pt-14 shadow-sm">
        {/* 💬 Card containing user details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{user.name || "User"}</h1>
            {/* 💬 Displays user's full name */}
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
              <Mail className="h-4 w-4 text-indigo-500" /> {user.email}
            </p>
            {/* 💬 Displays user's email with mail icon */}
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-800 capitalize">
              <Shield className="h-3.5 w-3.5" /> Role: {user.role}
            </span>
            {/* 💬 Displays user role badge ("customer" or "admin") */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="rounded-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950/30 gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
            {/* 💬 Sign out button */}
          </div>
        </div>
        {/* User Details Grid */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Account ID</h3>
            <p className="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">#{user.id}</p>
            {/* 💬 Account numeric ID block */}
          </div>
        </div>
        {/* Navigation Quick Links */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4">
          <Link href="/">
            <Button variant="outline" className="rounded-full gap-2">
              <ShoppingBag className="h-4 w-4 text-indigo-600" /> Continue Shopping
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" className="rounded-full gap-2">
              <ShoppingCart className="h-4 w-4 text-indigo-600" /> View Cart
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}