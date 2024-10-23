import type { Metadata } from "next";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "porterplays",
  description: "porterplays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        <NavMenu />
        <div className="h-20"></div>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
