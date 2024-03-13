import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../assets/globals.css";

import AuthProvider from "./(user-subsystem)/components/AuthProvider";

import { Toaster } from "@/components/ui/sonner";

import Header from "./layout-components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NU Munchies - Save food, save money",
  description: "NU Munchies is a platform for sharing food and reducing waste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <Header />
        <div className="m-2">
          {children}
        </div>
        <Toaster />
      </AuthProvider>
      </body>
    </html>
  );
}
