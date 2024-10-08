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

import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header/header";
import WagmiConfigProvider from "@/contexts/WagmiConfigProvider";
import { StateContextProvider } from '@/contexts/CrowdFundingContext';
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
        <main>
          <WagmiConfigProvider>
            <StateContextProvider>
              {children}
            </StateContextProvider>
          </WagmiConfigProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
