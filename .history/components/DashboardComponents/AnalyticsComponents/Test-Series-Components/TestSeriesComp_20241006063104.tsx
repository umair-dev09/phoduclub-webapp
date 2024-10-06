"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
function TestSeriesComp() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState<string>('');

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[3]
            if (currentPath === 'PhoduJeeMainsTestSeries') {
                setActiveTab('PhoduJeeMainsTestSeries')
            }

        }
    }, [pathname]);

    return (

        <button className="hover:bg-[#F9FAFB] "
            onClick={() => handleTabClick("PhoduJeeMainsTestSeries", "/analytics/test-series/PhoduJeeMainsTestSeries")}>

            <tr className="flex flex-1 py-3 border-t border-lightGrey text-[#1D2939]">
                <td className="flex flex-col px-8 w-[30%] text-left">
                    <div className="text-custompurple font-semibold underline">Phodu JEE Mains Test Series 2025</div>
                    <div className="text-[13px] text-neutral-500">30 Tests</div>
                </td>
                <td className="flex justify-center items-center w-[15%]">932</td>
                <td className="flex justify-center items-center w-[15%]">143/150</td>
                <td className="flex justify-center items-center w-[15%]">80%</td>
                <td className="flex justify-center items-center w-[15%]">45h 30m</td>
                <td className="flex justify-center items-center w-[15%]"><p className="text-end w-16">2h</p></td>
            </tr>

        </button>
    );
}

export default TestSeriesComp;