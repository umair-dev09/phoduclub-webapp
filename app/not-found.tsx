"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="h-screen w-full flex items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center gap-4 max-w-md text-center">
                <Image
                    src="/icons/not-found-image.svg"
                    width={120}
                    height={120}
                    alt="not-found"
                    className="w-24 h-24 sm:w-32 sm:h-32"
                />
                <h1 className="text-[#101828] font-bold text-xl sm:text-2xl">
                    Something went wrong
                </h1>
                <span className="font-medium text-sm sm:text-base text-[#667085]">
                    Sorry, we couldn’t find the page you were looking for.
                </span>
                <button
                    className="font-semibold text-sm sm:text-base text-[#9012FF] bg-[#F9F5FF] hover:bg-[#E0C9FF] px-4 py-2 rounded-xl transition duration-200"
                    onClick={() => router.push("/dashboard")}
                >
                    Go back home
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;
