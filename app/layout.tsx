import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-1 overflow-hidden">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
