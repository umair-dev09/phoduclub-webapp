"use client";

import React, { useState } from "react";
import Image from "next/image";

// function BeforeChatComp() {
//     const [showChatArea, setShowChatArea] = useState(false);

//     const handleSendChatRequest = () => {
//         setShowChatArea(true);
//     };

//     const handleChatArea = () => {
//         setShowChatArea(false);
//     };

//     return (
//         <div className="flex flex-1 flex-col">
//             <div className="flex flex-1 flex-col items-center justify-center gap-4">
//                 <Image src='/images/Content-Media-Mobile-App--Streamline-Brooklyn.svg' alt="new conversation image" width={112} height={112} />
//                 {!showChatArea && (
//                     <p className="w-[30.125rem] text-center text-sm font-normal text-[#667085]">
//                         To start a conversation, please send a chat request in the community. Once your request is accepted, you will be able to send messages and communicate privately.
//                     </p>
//                 )}
//                 {showChatArea && (
//                     <p className="w-[30.125rem] text-center text-sm font-normal text-[#667085]">
//                         Your chat is empty. Start the conversation now and send a message!
//                     </p>
//                 )}
//                 {!showChatArea && (
//                     <button
//                         onClick={handleSendChatRequest}
//                         className="px-6 py-[10px] bg-[#9012FF] shadow-inner-button text-white text-sm font-semibold border border-[#800EE2] transition-colors rounded-md hover:bg-[#8501FF]"
//                     >
//                         Send Chat Request
//                     </button>
//                 )}
//             </div>
//             {showChatArea && (
//                 <div className="flex h-[100px] bg-white items-center justify-center">
//                     <button
//                         onClick={handleChatArea}
//                         className="hover:underline"
//                     >
//                         chat-area
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default BeforeChatComp;

// ---------------------------------------------------------------------------------------------------

// import React from "react";
// import Image from "next/image";

// function BeforeChatComp() {

//     return (
//         <div className="flex flex-1 flex-col items-center justify-center gap-4">
//             <Image src='/images/user-block-01.svg' alt="unblock user" width={122} height={122} />
//             <p className="w-[30.125rem] text-center text-sm font-normal text-[#667085]">
//                 You have blocked this user. To resume the conversation, unblock them first.
//             </p>
//             <button
//                 className="px-6 py-[10px] bg-[#9012FF] shadow-inner-button text-white text-sm font-semibold border border-[#800EE2] transition-colors rounded-md hover:bg-[#8501FF]"
//             >
//                 Unblock User
//             </button>

//         </div>
//     );
// }

// export default BeforeChatComp;

// ---------------------------------------------------------------------------------------------------

// import React from "react";
// import Image from "next/image";

function RequestSentNotes() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col w-[20.75rem] p-6 border border-neutral-300 rounded-2xl bg-white gap-4">
                    <div className="flex flex-row justify-start w-full gap-1">
                        <Image src='/icons/alert-circle.svg' alt="alert" width={20} height={20} />
                        <h4 className="font-semibold text-[#182230]">Notes</h4>
                    </div>
                    <div className="flex flex-col w-full px-2">
                        <div className="flex flex-row w-full gap-2">
                            <p className="-mt-[1px]">&#183;</p>
                            <p className="flex justify-center text-sm text-neutral-500 leading-6">
                                Only chat about regarding course.
                            </p>
                        </div>
                        <div className="flex flex-row w-full gap-2">
                            <p className="-mt-[1px]">&#183;</p>
                            <p className="flex justify-center text-sm text-neutral-500 leading-6">
                                Don’t use any bad words, or else you’ll be removed from community.
                            </p>
                        </div>
                        <div className="flex flex-row w-full gap-2">
                            <p className="-mt-[1px]">&#183;</p>
                            <p className="flex justify-center text-sm text-neutral-500 leading-6">
                                User respectful language to coordinate with other users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center h-[70px] px-6 bg-white">
                <p className="text-center text-sm text-[#667085] font-normal">
                    Request has been sent to this user. Will notify you once request is accepted by user. After that you can start your conversation.
                </p>
            </div>
        </div>
    );
}

export default RequestSentNotes;

