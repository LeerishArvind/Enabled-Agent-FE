"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { api } from "../../lib/api";
import { saveAuth } from "../../lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await api.signup({ email, password });
      saveAuth({ access_token: data.access_token, user: data.user });
      router.push("/dashboard");
    } catch (error) {
      setErr(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Signup</h2>
        <p className="small">Creates account and logs you in.</p>

        <form onSubmit={onSubmit} className="row">
          <div className="col">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com" />
          </div>

          <div className="col">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password123"
              type="password"
            />
          </div>

          <div className="col" style={{ flexBasis: "100%" }}>
            <button className="primary" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>

          {err ? (
            <div className="col" style={{ flexBasis: "100%" }}>
              <pre>{err}</pre>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
}