"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div style={{ lineHeight: 1.55 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => <h3 style={{ margin: "10px 0" }}>{children}</h3>,
          h2: ({ children }) => <h4 style={{ margin: "10px 0" }}>{children}</h4>,
          h3: ({ children }) => <h5 style={{ margin: "10px 0" }}>{children}</h5>,
          p: ({ children }) => <p style={{ margin: "8px 0" }}>{children}</p>,
          ul: ({ children }) => <ul style={{ margin: "8px 0 8px 18px" }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ margin: "8px 0 8px 18px" }}>{children}</ol>,
          li: ({ children }) => <li style={{ marginBottom: 6 }}>{children}</li>,
          strong: ({ children }) => (
            <strong style={{ color: "var(--text)" }}>{children}</strong>
          ),
          code: ({ children }) => (
            <code
              style={{
                padding: "2px 6px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}