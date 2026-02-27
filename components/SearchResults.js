"use client";

import { useState } from "react";
import ReportViewer from "./ReportViewer";
import MarkdownRenderer from "./MarkdownRenderer";

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

        const score = Number(r.final_score ?? 0);
        const scoreColor =
          score > 0.7 ? "#16a34a" : score > 0.4 ? "#f59e0b" : "#ef4444";

        return (
          <div
            className="card"
            key={r.candidate_id}
            style={{ marginBottom: 12 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {/* Left: Identity */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {r.name?.trim() || `Candidate #${r.candidate_id}`}
                </div>

                {r.email ? (
                  <a
                    className="small"
                    href={`mailto:${r.email}`}
                    style={{ textDecoration: "underline", width: "fit-content" }}
                  >
                    {r.email}
                  </a>
                ) : (
                  <div className="small">No email provided</div>
                )}

                <div className="kv">
                  <span className="badge">ID: {r.candidate_id}</span>

                  <span
                    className="badge"
                    style={{
                      borderColor: scoreColor,
                      color: scoreColor,
                    }}
                  >
                    Score: {score.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Right: Detailed report toggle */}
              <button
                onClick={() => {
                  if (!r.detailed_report) return;
                  setOpenId(isOpen ? null : r.candidate_id);
                }}
                disabled={!r.detailed_report}
                style={{
                  opacity: r.detailed_report ? 1 : 0.55,
                  cursor: r.detailed_report ? "pointer" : "not-allowed",
                  alignSelf: "flex-start",
                  whiteSpace: "nowrap",
                }}
                title={r.detailed_report ? "View detailed report" : "Detailed report not available"}
              >
                {r.detailed_report
                  ? isOpen
                    ? "Hide detailed report"
                    : "Detailed report"
                  : "No detailed report"}
              </button>
            </div>

            <div className="hr" />

            <h4 style={{ margin: "0 0 10px" }}>Explanation</h4>

            <MarkdownRenderer content={r.explanation} />

            {isOpen ? <ReportViewer text={r.detailed_report} /> : null}
          </div>
        );
      })}
    </div>
  );
}