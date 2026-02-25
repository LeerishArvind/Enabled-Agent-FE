"use client";

import { useState } from "react";

export default function SearchForm({ onSearch, loading }) {
  const [jobDescription, setJobDescription] = useState("Backend engineer with Python, FastAPI, SQL, Docker");
  const [topK, setTopK] = useState(3);

  function submit(e) {
    e.preventDefault();
    onSearch({ job_description: jobDescription, top_k: Number(topK) });
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Employer Search</h3>
      <form onSubmit={submit} className="row">
        <div className="col" style={{ flexBasis: "100%" }}>
          <label>Job Description</label>
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>

        <div className="col">
          <label>Top K</label>
          <input
            type="number"
            min="1"
            max="50"
            value={topK}
            onChange={(e) => setTopK(e.target.value)}
          />
        </div>

        <div className="col" style={{ display: "flex", alignItems: "end" }}>
          <button className="primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
      <p className="small" style={{ marginBottom: 0 }}>
        Shows explanation first. Detailed report is expandable and structured.
      </p>
    </div>
  );
}