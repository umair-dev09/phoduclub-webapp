import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import the next/script component
import "./globals.css";
import { Providers } from "./providers";
import ClientWrapper from "@/components/ClientWrapper"; // Adjust the path as needed

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
