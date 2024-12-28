"use client";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import LoadingData from "@/components/Loading";
import { format, parseISO } from 'date-fns';

function formatDate(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'do MMM, yyyy');
}


interface ActionButtonProps {
    src: string;
    alt: string;
    label: string;
}

function ActionButton({ src, alt, label }: ActionButtonProps) {
    return (
        <button className="flex items-center p-3 hover:bg-[#F2F4F7] w-full">
            <Image src={src} width={20} height={20} alt={alt} />
            <p className="text-sm text-[#000000] font-normal ml-2">{label}</p>
        </button>
    );
}

interface PurchaseData {
    contentType: string;
    dateOfPurchase: string;
    contentId: string;
    purchasedPrice: string;
    paymentType: string;
    transactionId: string;
    contentName?: string;
}

function Purchase() { 
    const [transactions, setTransactions] = useState<PurchaseData[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = auth.currentUser?.uid;
    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const transactionsCollection = collection(db, `users/${userId}/transactions`);
                const transactionsSnapshot = await getDocs(transactionsCollection);
                const fetchedTransactions = transactionsSnapshot.docs.map((doc) => doc.data() as PurchaseData);
                setTransactions(fetchedTransactions);
            } catch (error) {
                console.error('Error fetching transactions: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId]);
    const fetchContentName = async (contentType: string, contentId: string) => {
        try {
            let contentName = '';
            if (contentType === 'course') {
                const docRef = doc(db, `course/${contentId}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    contentName = docSnap.data().courseName;
                }
            } else if (contentType === 'testseries') {
                const docRef = doc(db, `testseries/${contentId}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    contentName = docSnap.data().testName;
                }
            }
            return contentName;
        } catch (error) {
            console.error('Error fetching content name: ', error);
            return '';
        }
    };

    useEffect(() => {
        const fetchAllContentNames = async () => {
            const updatedTransactions = await Promise.all(
                transactions.map(async (transaction) => {
                    const contentName = await fetchContentName(transaction.contentType, transaction.contentId);
                    return { ...transaction, contentName };
                })
            );
            setTransactions(updatedTransactions);
        };

        if (transactions.length > 0) {
            fetchAllContentNames();
        }
    }, [transactions]);

    if (loading) {
        return <LoadingData />;
    }

    return (
        <div
            className="mx-6 border border-solid border-[#EAECF0] rounded-lg h-[calc(100vh-200px)] overflow-y-auto 
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border-spacing-0">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr className="text-[#667085]">
                            <th className="text-xs text-left py-4 px-6 font-semibold leading-[18px]">ITEMS</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">DATE</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">PRICE</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">TRANSACTION ID</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map((transaction, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-sm">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[#1D2939] font-semibold leading-6">{transaction.contentName || transaction.contentType}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">{formatDate(transaction.dateOfPurchase)}</td>
                                <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6">₹ {transaction.purchasedPrice}</td>
                                <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">{transaction.transactionId}</td>
                                <td className="px-6 py-4  text-center">
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <button className="focus:outline-none">
                                                <Image
                                                    src="/icons/three-dots.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Actions Menu"
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-md w-[195px] px-0 shadow-md">
                                            <ActionButton
                                                src="/icons/download-reciepts.svg"
                                                alt="Download Receipt"
                                                label="Download Receipt"
                                            />
                                            <ActionButton
                                                src="/icons/Download Invoice.svg"
                                                alt="Download Invoice"
                                                label="Download Invoice"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Purchase;