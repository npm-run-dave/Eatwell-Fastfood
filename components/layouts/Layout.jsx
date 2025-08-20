import "./globals.css";
import Layout from "@/components/layouts/Layout";  // ✅ correct path

export const metadata = {
  title: "My Next App",
  description: "Built with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>   {/* ✅ wraps pages */}
      </body>
    </html>
  );
}
