 import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAMLAT — Multi-chain P2P Ecosystem",
  description: "A multi-chain peer-to-peer marketplace and trading dashboard prototype.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
