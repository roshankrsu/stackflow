import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Header from "./components/Header";
import ToastProvider from "@/components/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackFlow",
  description: "Q&A platform for developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "dark:bg-black dark:text-white")}>
        <Header />
        {children}
        <ToastProvider /> 
      </body>
    </html>
  );
}