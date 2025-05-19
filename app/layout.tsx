import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import the next/script component
import "./globals.css";
import { Providers } from "./providers";
import ClientWrapper from "@/components/ClientWrapper"; // Adjust the path as needed
import Image from "next/image";
import ClientSideLayout from "@/components/ClientSideLayout";

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
        <Script
          src="https://sdk.cashfree.com/js/v3/cashfree.js"
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <ClientSideLayout>
            {children}
          </ClientSideLayout>
        </Providers>
      </body>
    </html>
  );
}