"use client";

import { useRef, useState } from "react";

const ACCEPTED_TYPES = ".pdf,.docx,.png,.jpg,.jpeg";

export default function SearchForm({ onSearch, loading }) {
  const [mode, setMode] = useState("text");
  const [jobDescription, setJobDescription] = useState(
    "Backend engineer with Python, FastAPI, SQL, Docker"
  );
  const [topK, setTopK] = useState(3);
  const [jdFile, setJdFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    setFileError("");

    if (!file) {
      setJdFile(null);
      return;
    }

    const allowedExt = ["pdf", "docx", "png", "jpg", "jpeg"];
    const ext = file.name.split(".").pop()?.toLowerCase();

    if (!ext || !allowedExt.includes(ext)) {
      setJdFile(null);
      setFileError("Unsupported file type. Please upload PDF, DOCX, PNG, JPG, or JPEG.");
      return;
    }

    setJdFile(file);
  }

  function submit(e) {
    e.preventDefault();

    if (mode === "text") {
      onSearch({
        mode: "text",
        job_description: jobDescription,
        top_k: Number(topK),
      });
      return;
    }

    if (!jdFile) {
      setFileError("Please upload a JD file before searching.");
      return;
    }

    onSearch({
      mode: "file",
      jd_file: jdFile,
      top_k: Number(topK),
    });
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Find Your Perfect Candidates</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setMode("text")}
          className={mode === "text" ? "primary" : ""}
        >
          Search by Text
        </button>

        <button
          type="button"
          onClick={() => setMode("file")}
          className={mode === "file" ? "primary" : ""}
        >
          Search by File
        </button>
      </div>

      <form onSubmit={submit} className="row">
        {mode === "text" ? (
          <div className="col" style={{ flexBasis: "100%" }}>
            <label>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
        ) : (
          <div className="col" style={{ flexBasis: "100%" }}>
            <label>Upload JD File</label>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button type="button" onClick={() => fileInputRef.current?.click()}>
                Choose File
              </button>

              <span className="small">
                {jdFile ? jdFile.name : "Supported: PDF, DOCX, PNG, JPG, JPEG"}
              </span>
            </div>

            {fileError ? (
              <div style={{ marginTop: 8 }}>
                <span className="small" style={{ color: "#ff8f8f" }}>
                  {fileError}
                </span>
              </div>
            ) : null}
          </div>
        )}

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
        Search using a typed job description or upload a JD file.
      </p>
    </div>
  );
}