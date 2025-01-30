'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { auth, db } from "@/firebase";
import { arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';

interface NotificationData {
    name: string;
    cta: string;
    notificationIcon: string;
    notificationId: string;
    description: string; 
    hyperLink: string;
    usersClosedNotification: string[];
    premiumUsersClicks: {userId: string, clickedAt: string}[];
    freeUsersClicks: {userId: string, clickedAt: string}[];
}

function Notification() {
    const [notification, setNotification] = useState<NotificationData>();
    const [loading, setLoading] = useState(true);
    const currentUserId = auth.currentUser?.uid;

    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if (!currentUserId) return;

        const fetchIsPremium = async () => {
            try {
                const userRef = doc(db, 'users', currentUserId);
                const userDoc = await getDoc(userRef);
                
                if (userDoc.exists()) {
                    setIsPremium(userDoc.data().isPremium || false);
                }
            } catch (error) {
                console.error("Error fetching premium status: ", error);
            }
        };

        fetchIsPremium();
    }, [currentUserId]);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const notificationRef = collection(db, 'notifications');
                const notificationQuery = query(notificationRef, orderBy("createdAt", "desc")); // Order by timestamp

                const unsubscribe = onSnapshot(notificationQuery, (snapshot) => {
                    const liveNotification = snapshot.docs
                        .find(doc => doc.data().status === 'live');
                    
                    if (liveNotification) {
                        const notificationData: NotificationData = {
                            ...liveNotification.data(),
                            notificationId: liveNotification.id
                        } as NotificationData;
                        setNotification(notificationData); // Keep array structure but with single item
                    } else {
                        setNotification(undefined); // No live notification found
                    }
                    setLoading(false);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching notification: ", error);
            }
        };

        fetchNotification();
    }, []);

    const handleCloseNotification = async (notificationId: string) => {
            try {
                const notificationRef = doc(db, 'notifications', notificationId);
                const notificationDoc = await getDoc(notificationRef);
                
                if (notificationDoc.exists()) {
                    const currentClosedUsers = notificationDoc.data().usersClosedNotification || [];
                    if (!currentClosedUsers.includes(currentUserId)) {
                        await updateDoc(notificationRef, {
                            usersClosedNotification: arrayUnion(currentUserId),
                        });
                    }
                }
            } catch (error) {
                console.error("Error updating notification: ", error);
            }
        
    };

    const handleNotificationClick = async (notificationId: string) => {
        try {
            const notificationRef = doc(db, 'notifications', notificationId);
            const notificationDoc = await getDoc(notificationRef);
            
            if (notificationDoc.exists()) {
                const currentClosedUsers = notificationDoc.data().usersClosedNotification || [];
                if (!currentClosedUsers.includes(currentUserId)) {
                    await updateDoc(notificationRef, {
                        [isPremium ? 'premiumUsersClicks' : 'freeUsersClicks']: arrayUnion({
                            userId: currentUserId,
                            clickedAt: new Date().toISOString()
                        })
                    });
                }
            }
        } catch (error) {
            console.error("Error updating notification: ", error);
        }
    
};


    return (
        <div>
        {(!loading && notification && currentUserId && 
          ![
            notification.usersClosedNotification,
            notification.premiumUsersClicks,
            notification.freeUsersClicks
          ].some(array => {
            if (!array) return false;
            if (typeof array[0] === 'string') {
              return (array as string[]).includes(currentUserId || '');
            }
            return (array as { userId: string; clickedAt: string }[]).some(item => item.userId === currentUserId);
          })
        ) && (
            <div className='flex flex-row bg-[#FEDAAA] h-auto w-full py-3 px-4 items-center justify-between'>
            <div className='flex flex-row flex-1 items-center justify-center'>
            <Image className='w-5 h-5 mr-[6px]' src={notification?.notificationIcon || '/icons/idea-2.svg'} width={24} height={24} alt='icon' />
            <h3 className='text-sm font-bold'>{notification?.name || 'Notification'}: </h3>
            <h3 className='text-sm font-normal ml-1'>{notification?.description || 'Loading...'}</h3>
            <button onClick={() => {handleNotificationClick(notification.notificationId); window.open(notification?.hyperLink, '_blank'); }} className='ml-3 h-[36px] w-auto px-3 text-[13px] font-semibold border bg-white border-[#cccccc] rounded-md'>{notification?.cta || 'Click Here'}</button>
            </div>
            <button onClick={() => handleCloseNotification(notification?.notificationId || '')}
            ><Image className='w-5 h-5 mr-[6px] ' src='/icons/cancel.svg' width={24} height={24} alt='icon' /></button>
            </div>
        )}
        </div>
    );
}

export default Notification;