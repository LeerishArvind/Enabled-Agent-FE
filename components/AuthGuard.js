"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../lib/auth";

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) router.replace("/login");
  }, [router]);

  return children;
}