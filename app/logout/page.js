"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { api } from "../../lib/api";
import { clearAuth } from "../../lib/auth";

export default function LogoutPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("Logging out...");

  useEffect(() => {
    (async () => {
      try {
        await api.logout();
      } catch (e) {
        // even if backend fails, we still clear local auth
      } finally {
        clearAuth();
        setMsg("Logged out. Redirecting...");
        setTimeout(() => router.replace("/login"), 600);
      }
    })();
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Logout</h3>
        <p className="muted">{msg}</p>
      </div>
    </>
  );
}