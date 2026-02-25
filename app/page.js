import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="card">
        <h1 style={{ marginTop: 0 }}>FastAPI ↔ Next.js Integration</h1>
        <p className="muted">
          Minimal functional UI now. Styling later. Go to Signup/Login, then Dashboard to run employer search.
        </p>
        <div className="hr" />
        <div className="kv">
          <span className="badge">Next.js App Router</span>
          <span className="badge">JWT Bearer Auth</span>
          <span className="badge">FastAPI local</span>
        </div>
      </div>
    </>
  );
}