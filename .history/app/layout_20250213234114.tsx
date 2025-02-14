"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import the next/script component
import "./globals.css";
import { Providers } from "./providers";
import ClientWrapper from "@/components/ClientWrapper"; // Adjust the path as needed
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phodu Club",
  description: "Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      // Initial check
      handleResize();

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Clean up event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // If mobile view is detected, render a blocking message
  if (isMobile) {
    return (
      <html lang="en">
        <head>
          <title>Access Blocked</title>
        </head>
        <body style={{ fontFamily: "sans-serif", textAlign: "center", padding: "2rem" }}>
          <h1 style={{ color: "#d32f2f", fontSize: "2rem" }}>Access Blocked on Mobile Devices</h1>
          <p style={{ fontSize: "1rem" }}>Please use a desktop to view this website.</p>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <head>
        {/* Add the script using next/script */}
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree.js"
          strategy="lazyOnload" // Loads the script after the page is idle
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-1 overflow-hidden">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
