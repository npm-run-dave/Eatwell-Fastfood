import "./globals.css";
import Layout from "@/components/layouts/Layout";
import Widget from "@/components/icons/Widget";
export const metadata = {
  title: "My Next App",
  description: "Built with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        <Widget />
      </body>
    </html>
  );
}
