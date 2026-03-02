import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="landing">
        <div className="hero" style={{ textAlign: "center" }}>
          <h1 className="heroTitle">Enabled Agent</h1>

          <p className="heroSub" style={{ margin: "14px auto 0", maxWidth: "60ch" }}>
            Make hiring easy and intelligent.  
            Instantly rank candidates from a job description and review clear,
            explainable insights.
          </p>

          <div
            className="ctaRow"
            style={{
              justifyContent: "center",
              marginTop: 28,
            }}
          >
            <Link className="btn btnPrimary" href="/dashboard">
              Go to Dashboard →
            </Link>

            <Link className="btn" href="/login">
              Login
            </Link>

            <Link className="btn" href="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}