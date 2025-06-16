// src/app/layout.tsx
import { cn } from "@/lib/utils";
import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  title: "FinMate — Your Financial Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", nunito.variable)}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
