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
            const currentPath = pathname.split('/')[3];
            if (currentPath === 'test') {
                setActiveTab('test');
            }
        }
    }, [pathname]);
    return (

        <button className="hover:bg-[#EAECF0] "
            onClick={() => handleTabClick("PhoduJeeMainsTestSeries", "/analytics/test-series/PhoduJeeMainsTestSeries")}>
            <div>
                <tr className="flex flex-1 py-3 pl-8 border-t border-lightGrey text-[#1D2939]">
                    <td className="flex flex-col w-[30%]">
                        <div className="text-custompurple font-semibold underline">Phodu JEE Mains Test Series 2025</div>
                        <div className="text-[13px] text-neutral-500">30 Tests</div>
                    </td>
                    <td className="flex justify-center items-center w-[15%]">932</td>
                    <td className="flex justify-center items-center w-[15%]">143/150</td>
                    <td className="flex justify-center items-center w-[15%]">80%</td>
                    <td className="flex justify-center items-center w-[15%]">45h 30m</td>
                    <td className="flex justify-center items-center w-[15%]"><p className="text-end w-16">90h 20m</p></td>
                </tr>
            </div>

        </button>
    );
}

export default TestSeriesComp;