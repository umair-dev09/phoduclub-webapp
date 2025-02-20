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
import Image from "next/image";

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
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="hidden md:flex flex-1 overflow-hidden">
            {children}
          </div>
          <div className="flex flex-col md:hidden justify-center items-center h-screen gap-6 mx-3">
            <Image src={'/default/small_screen.png'} alt="Window too small" width={200} height={200} />
            <div className="flex flex-col gap-2">
              <p className="text-center text-xl font-semibold text-gray-600">Window too small!</p>
              <p className="text-center text-sm font-light text-gray-600">
                You are signed in! But it seems the window for phodu.club is too small or too zoomed in.
              </p>
              {/* <p className="text-center text-sm font-light text-gray-600">
                Window too small for phodu.club. Please resize or use a larger device.
              </p> */}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}