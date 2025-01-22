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
    const [copied, setCopied] = useState(false);
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


    const handleCopy = (transactionId: string) => {
        if (transactionId) {
            navigator.clipboard.writeText(transactionId)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
                })
                .catch(err => console.error('Failed to copy text: ', err));
        } else {
            console.error('No valid transactionId to copy');
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
        <div className="px-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="mx-1 border border-solid border-[#EAECF0] rounded-lg h-fit">
                <div className="overflow-x-auto min-w-full"> {/* Ensure the table has a minimum width for scrolling */}
                    <table className="w-full min-w-[800px] border-collapse border-spacing-0"> {/* Add min-width to ensure table is scrollable */}
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr className="text-[#667085]">
                                <th className="w-[28%] text-xs text-left py-4 px-6 font-semibold leading-[18px]">ITEMS</th>
                                <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">DATE</th>
                                <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">PRICE</th>
                                <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">TRANSACTION ID</th>
                                <th className="w-[10%] text-xs text-center py-4 px-6 font-semibold leading-[18px]">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr key={index} className="hover:bg-gray-50 text-sm">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col whitespace-nowrap">
                                                <span className="text-[#1D2939] font-semibold leading-6">{transaction.contentName || transaction.contentType}</span>

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">{formatDate(transaction.dateOfPurchase)}</td>
                                        <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">₹ {transaction.purchasedPrice}</td>
                                        <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">
                                            <div className="flex items-center justify-center">
                                                <span>{transaction.transactionId}</span>
                                                <button
                                                    className="ml-2"
                                                    onClick={() => handleCopy(transaction.transactionId)}
                                                >
                                                    <Image
                                                        src="/icons/CopyButton.svg"
                                                        alt="copy button"
                                                        height={22}
                                                        width={22}
                                                    />
                                                </button>
                                                {copied && (
                                                    <span className="absolute top-[2px] px-2 bg-[#1D2939] rounded-[6px] text-white font-medium text-[11px]">
                                                        Copied!!
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right">
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
                                ))
                            ) : (
                                <tr className="border-t border-lightGrey">
                                    <td colSpan={5} className="text-center py-8">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <p className="text-[#667085] text-sm">No purchases found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Purchase;