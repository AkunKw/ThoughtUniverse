import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ThoughtUniverse",
  description: "A universe of connected thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
