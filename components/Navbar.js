"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserMeta, getAccessToken } from "../lib/auth";

export default function Navbar() {
  const [meta, setMeta] = useState({ email: "", id: "" });
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setMeta(getUserMeta());
    setAuthed(!!getAccessToken());
  }, []);

  return (
    <div className="nav">
      <Link className="brand" href="/">
        Enabled Agent
      </Link>

      <div className="links">
        {authed ? (
          <>
            <span className="pill">
              <span>Signed in</span>
              <span>•</span>
              <span>{meta.email || "user"}</span>
            </span>
            <Link className="pill" href="/dashboard">Dashboard</Link>
            <Link className="pill" href="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link className="pill" href="/login">Login</Link>
            <Link className="pill" href="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}