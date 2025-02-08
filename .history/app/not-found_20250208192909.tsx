"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

function NotFoundPage() {
    const router = useRouter();
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-3">
                <Image
                    src="/icons/not-found-image.svg"
                    width={140}
                    height={140}
                    alt="not-found"
                />
                <h1 className="text-[#101828] font-bold text-2xl">
                    Something went wrong
                </h1>
                <span className="font-medium text-base text-[#667085]">
                    Sorry, we couldn’t find the page you were looking for
                </span>
                <button className="font-semibold text-base text-[#9012FF] hover:bg-[#E0C9FF]  px-4 py-2 rounded-xl"
                    onClick={() => router.push("/dashboard")}>
                    Go back home
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;
