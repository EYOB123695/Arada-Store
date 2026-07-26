"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("platzi_access_token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router]);

  return null;
}
