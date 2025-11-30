import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Portfolio - Cyberpunk Theme",
  description: "High-performance AI-themed personal portfolio with admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(26, 26, 36, 0.9)",
                color: "#e5e5e5",
                border: "1px solid rgba(0, 255, 249, 0.3)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
