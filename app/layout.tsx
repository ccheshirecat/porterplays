import type { Metadata } from "next";
import "./globals.css";
import { NavMenu } from "@/components/NavMenu";
import Footer from "@/components/footer";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
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
    <ClerkProvider>
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        <NavMenu />
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
