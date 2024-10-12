"use client";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

function ChartArea() {
    const messageStart = `Hey @everyone 

his is jabir ali talking to you from the Amity `;

    const formatMessage = (text: string) => {
        return text.split('\n').map((line: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
            <span key={index} className={index !== 0 ? "block mt-3" : ""}>
                {line}
            </span>
        ));
    };

    return (
        <div className="mx-6 h-full w-full mt-6">
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <img
                        src="/api/placeholder/36/36"
                        width={36}
                        height={36}
                        alt="Others-chat-profile"
                        className="rounded-full"
                    />
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-xs text-[#475467]">3:24 PM</span>
                </div>
                <div className="ml-11 flex">
                    <div className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block">
                        <div className="break-words font-normal text-[#182230] text-sm">
                            {formatMessage(messageStart)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartArea;
