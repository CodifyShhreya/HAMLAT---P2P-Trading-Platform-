import type { Metadata } from "next";
import "../styles/globals.css";
import { AppShell } from "@/components/layout/app-shell";
export const metadata: Metadata = { title: "HAMLAT | Multi-chain P2P Ecosystem", description: "Multi-chain P2P marketplace frontend prototype." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><AppShell>{children}</AppShell></body></html>; }
