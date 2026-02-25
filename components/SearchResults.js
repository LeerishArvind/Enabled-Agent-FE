"use client";

import { useState } from "react";
import ReportViewer from "./ReportViewer";
import MarkdownRenderer from "./MarkdownRenderer"; // ✅ add this

export default function SearchResults({ results }) {
  const [openId, setOpenId] = useState(null);

  if (!results?.length) {
    return (
      <div className="card" style={{ marginTop: 12 }}>
        <p className="muted" style={{ margin: 0 }}>
          No results yet. Run a search.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      {results.map((r) => {
        const isOpen = openId === r.candidate_id;

        return (
          <div className="card" key={r.candidate_id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div className="kv">
                <span className="badge">Candidate #{r.candidate_id}</span>
                <span className="badge">Score: {Number(r.final_score).toFixed(4)}</span>
              </div>

              {r.detailed_report ? (
                <button onClick={() => setOpenId(isOpen ? null : r.candidate_id)}>
                  {isOpen ? "Hide detailed report" : "Detailed report"}
                </button>
              ) : (
                <span className="badge">No detailed report</span>
              )}
            </div>

            <div className="hr" />

            <h4 style={{ margin: "0 0 10px" }}>Explanation</h4>

            {/* ✅ markdown rendering instead of <pre> */}
            <MarkdownRenderer content={r.explanation} />

            {isOpen ? <ReportViewer text={r.detailed_report} /> : null}
          </div>
        );
      })}
    </div>
  );
}