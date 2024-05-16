/*
 * @Description:  
 * @Author: liaolei
 * @Date: 2024-05-14 09:13:39
 * @LastEditors: liaolei
 * @LastEditTime: 2024-05-16 17:22:56
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "simp1e's blog",
  description: "web3 front-end react nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="h-[calc(100%-64px)]">{children}</main>
      </body>
    </html>
  );
}
