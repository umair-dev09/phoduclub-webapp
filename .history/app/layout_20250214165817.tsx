// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Script from "next/script"; // Import the next/script component
// import "./globals.css";
// import { Providers } from "./providers";
// import ClientWrapper from "@/components/ClientWrapper"; // Adjust the path as needed

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Phodu Club",
//   description: "Web App",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Add the script using next/script */}
//         <Script
//           src="https://sdk.cashfree.com/js/v3/cashfree.js"
//           strategy="lazyOnload" // Loads the script after the page is idle
//         />
//       </head>
//       <body className={inter.className}>
//         <Providers>
//           <div className="flex flex-1 overflow-hidden">{children}</div>
//         </Providers>
//       </body>
//     </html>
//   );
// }
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

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Add the script using next/script */}
//         <Script
//           src="https://sdk.cashfree.com/js/v3/cashfree.js"
//           strategy="lazyOnload" // Loads the script after the page is idle
//         />
//       </head>
//       <body className={inter.className}>
//         <Providers>
//           <div className="flex flex-1 overflow-hidden">{children}</div>
//         </Providers>
//       </body>
//     </html>
//   );
// }

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
          <div className="hidden md:flex flex-1 overflow-hidden">
            {children}
          </div>
          <div className="flex md:hidden justify-center items-center h-screen">
            <p className="text-center text-xl font-semibold text-gray-600">
              This application is not available on mobile devices.
            </p>
          </div>
        </Providers>
      </body>
    </html>
  );
}