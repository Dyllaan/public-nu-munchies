import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import Provider from "./user-subsystem/Provider";

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
      <body className={inter.className}><Provider>{children}</Provider></body>
    </html>
  );
}
