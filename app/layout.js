import "../styles/globals.css";

export const metadata = {
  title: "FastAPI Hiring Frontend",
  description: "Next.js frontend for FastAPI backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}