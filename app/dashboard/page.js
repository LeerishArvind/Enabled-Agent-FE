"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import AuthGuard from "../../components/AuthGuard";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import { api } from "../../lib/api";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState("");

  async function onSearch(payload) {
    setErr("");
    setLoading(true);

    try {
      let data;

      if (payload.mode === "file") {
        data = await api.employerSearchByFile(payload.jd_file, payload.top_k);
      } else {
        data = await api.employerSearch({
          job_description: payload.job_description,
          top_k: payload.top_k,
        });
      }

      setResults(data.results || []);
    } catch (e) {
      setErr(e.message || "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <Navbar />
      <SearchForm onSearch={onSearch} loading={loading} />

      {err ? (
        <div className="card" style={{ marginTop: 12 }}>
          <pre style={{ margin: 0 }}>{err}</pre>
        </div>
      ) : null}

      <SearchResults results={results} />
    </AuthGuard>
  );
}