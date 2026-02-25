"use client";

function parseReport(text) {
  if (!text) return [];

  // Normalize
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd());

  const sections = [];
  let current = { title: "Report", items: [] };
  let inFence = false;

  function pushCurrentIfMeaningful() {
    const hasContent = current.items.some((x) => x.type !== "spacer");
    if (hasContent) sections.push(current);
  }

  for (let raw of lines) {
    const line = raw.trim();

    if (line === "```") {
      inFence = !inFence;
      current.items.push({ type: "codeFence", value: "```" });
      continue;
    }

    if (!line) {
      current.items.push({ type: "spacer" });
      continue;
    }

    // Skip separators like "---"
    if (/^---+$/.test(line)) continue;

    // Headings (simple heuristic)
    // e.g. "Candidate Evaluation Summary" or "Executive Summary:"
    const headingMatch = line.match(/^([A-Za-z0-9][A-Za-z0-9\s&/()-]{2,})(:)?$/);
    const looksLikeHeading =
      !inFence &&
      headingMatch &&
      (line.endsWith(":") ||
        /^[A-Z][A-Za-z0-9\s&/()-]+$/.test(line)) &&
      line.length <= 60;

    if (looksLikeHeading) {
      // start new section
      pushCurrentIfMeaningful();
      current = { title: line.replace(/:$/, ""), items: [] };
      continue;
    }

    // Bullet
    if (!inFence && /^[-•]\s+/.test(line)) {
      current.items.push({ type: "bullet", value: line.replace(/^[-•]\s+/, "") });
      continue;
    }

    // Key: Value line
    const kv = !inFence ? line.match(/^([A-Za-z][A-Za-z\s]+):\s*(.+)$/) : null;
    if (kv) {
      current.items.push({ type: "kv", key: kv[1].trim(), value: kv[2].trim() });
      continue;
    }

    // Default paragraph
    current.items.push({ type: "p", value: line });
  }

  pushCurrentIfMeaningful();
  return sections;
}

export default function ReportViewer({ text }) {
  const sections = parseReport(text);

  if (!text) return <p className="muted">No detailed report available.</p>;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h4 style={{ marginTop: 0 }}>Detailed Report</h4>

      {sections.map((sec, idx) => (
        <div key={idx} style={{ marginTop: idx === 0 ? 0 : 14 }}>
          <div className="pill" style={{ marginBottom: 10 }}>
            {sec.title}
          </div>

          {sec.items.map((it, i) => {
            if (it.type === "spacer") return <div key={i} style={{ height: 8 }} />;
            if (it.type === "kv")
              return (
                <div key={i} className="kv" style={{ marginBottom: 6 }}>
                  <span className="badge">{it.key}</span>
                  <span style={{ color: "var(--text)" }}>{it.value}</span>
                </div>
              );
            if (it.type === "bullet")
              return (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                  <span className="muted">•</span>
                  <div>{it.value}</div>
                </div>
              );
            if (it.type === "p")
              return (
                <p key={i} style={{ margin: "6px 0", color: "var(--text)" }}>
                  {it.value}
                </p>
              );
            return null;
          })}
        </div>
      ))}
    </div>
  );
}