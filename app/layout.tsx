import type { Metadata } from "next";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu";
import Footer from "@/components/footer";
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
