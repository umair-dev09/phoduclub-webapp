"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function ClientSideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Updated condition to include both md-payment and payment-status pages
  const isMobileAccessiblePage = pathname === "/md-payment" || pathname === "/payment-status";

  return (
    <>
      {/* For larger screens or mobile-accessible pages on any screen */}
      <div className={`${!isMobileAccessiblePage ? "hidden md:flex" : "flex"} flex-1 overflow-hidden`}>
        {children}
      </div>
      
      {/* For mobile screens, but not for mobile-accessible pages */}
      {!isMobileAccessiblePage && (
        <div className="flex flex-col md:hidden justify-center items-center h-screen gap-6 mx-3">
          <Image src={'/default/small_screen.png'} alt="Window too small" width={200} height={200} />
          <div className="flex flex-col gap-2">
            <p className="text-center text-xl font-semibold text-gray-600">Window too small!</p>
            <p className="text-center text-sm font-light text-gray-600">
              You are signed in! But it seems the window for phodu.club is too small or too zoomed in.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

