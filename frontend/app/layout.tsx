import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../assets/globals.css";

import AuthProvider from "./(user-subsystem)/components/AuthProvider";

import { Toaster } from "@/components/ui/sonner";

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
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
