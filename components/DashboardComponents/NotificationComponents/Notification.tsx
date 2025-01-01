'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

interface NotificationData {
    name: string;
    cta: string;
    notificationIcon: string;
    notificationId: string;
    description: string;
    hyperLink: string;

}

function Notification() {

    const [showNoti, setShowNoti] = useState(true);
    const [notification, setNotification] = useState<NotificationData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const discussionRef = collection(
                    db,
                    `notifications`
                );
                const discussionQuery = query(discussionRef, orderBy("createdAt", "desc")); // Order by timestamp

                const unsubscribe = onSnapshot(discussionQuery, (snapshot) => {
                    const discussionData: NotificationData[] = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                    })) as NotificationData[];
                    setNotification(discussionData); // Update state with the retrieved data
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching chats: ", error);
            }
        };

        fetchNotification();
    }, []);

    return (
        <div>
            {showNoti && (
                <div className='flex flex-row bg-[#FEDAAA] h-auto w-full py-3 px-4 items-center justify-between'>
                    {notification.length > 0 && (
                        <div key={notification[0].notificationId} className='flex flex-row flex-1 items-center justify-center'>
                            <Image className='w-5 h-5 mr-[6px]' src={notification[0]?.notificationIcon} width={24} height={24} alt='icon' />
                            <h3 className='text-sm font-bold'>{notification[0]?.name}: </h3>
                            <h3 className='text-sm font-normal ml-1'>{notification[0]?.description}</h3>
                            <button onClick={() => window.open(notification[0]?.hyperLink, '_blank')} className='ml-3 h-[36px] w-auto px-3 text-[13px] font-semibold border bg-white border-[#cccccc] rounded-md'>{notification[0]?.cta}</button>
                        </div>
                    )}
                    <button onClick={() => setShowNoti(false)}><Image className='w-5 h-5 mr-[6px] ' src='/icons/cancel.svg' width={24} height={24} alt='icon' /></button>
                </div>
            )}
        </div>
    );
}

export default Notification;