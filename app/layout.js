import "../styles/globals.css";

export const metadata = {
  title: "Enabled Agent",
  description: "Make hiring easy and intelligent",
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