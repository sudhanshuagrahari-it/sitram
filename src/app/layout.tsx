import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppShell from "./AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ISKCON Radha Madan Mohan",
  description: "Welcome to ISKCON Hyderabad interactive portal.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
