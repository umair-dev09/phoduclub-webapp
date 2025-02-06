import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-toastify";
import LoadingData from "@/components/Loading";

type ProductsProps = {
    userId: string;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

function Products({ userId }: ProductsProps) {
    const [popoveropen1, setPopoveropen1] = useState<number | null>(null);
    const [remove, setRemove] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productId, setProductId] = useState('');
    const [productType, setProductType] = useState('');
    const handlePopoverOpen1 = (index: number) => {
        if (typeof index === 'number') {
            setPopoveropen1(index);
        }
    };
    const [products, setProducts] = useState<Array<{
        id: string;
        name: string;
        image: string;
        price: number;
        date: string;
        type: string;
    }>>([]);

    const [userData, setUserData] = useState<{
        name: string;
        profilePic: string;
        userId: string;
        isPremium: boolean;
    }>({
        name: '',
        profilePic: '',
        userId: '',
        isPremium: false
    });

    useEffect(() => {
        const fetchUserDataAndProducts = async () => {
            if (!userId) return;

            try {
                // Fetch user data
                const userRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();
                if (userData) {
                    setUserData({
                        name: userData.name || '',
                        profilePic: userData.profilePic || '',
                        userId: userData.userId || '',
                        isPremium: userData.isPremium || false
                    });
                }

                // Fetch products
                const transactionsRef = collection(db, 'users', userId, 'transactions');
                const transactionsSnap = await getDocs(transactionsRef);

                const productPromises = transactionsSnap.docs.map(async (docSnapshot) => {
                    const data = docSnapshot.data();
                    if (!data) return null;

                    const productRef = doc(db, data.contentType === 'course' ? 'course' : 'testseries', data.contentId);
                    const productSnap = await getDoc(productRef);
                    const productData = productSnap.data() || {};

                    return {
                        id: data.contentId,
                        name: data.contentType === 'course' ? (productData.courseName || 'Untitled') : (productData.testName || 'Untitled'),
                        image: data.contentType === 'course' ? (productData.courseImage || '') : (productData.testImage || ''),
                        price: data.purchasedPrice || 0,
                        date: data.dateOfPurchase || '',
                        type: data.contentType || ''
                    };
                });

                const validProducts = (await Promise.all(productPromises)).filter(Boolean) as Array<{
                    id: string;
                    name: string;
                    image: string;
                    price: number;
                    date: string;
                    type: string;
                }>;
                setProducts(validProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserDataAndProducts();
    }, [userId]);


    const handleRemoveAccess = async (productId: string, productType: string) => {
        try {
            // Remove from course/testseries StudentsPurchased
            const collectionPath = productType === 'course' ? 'course' : 'testseries';
            const studentRef = doc(db, collectionPath, productId, 'StudentsPurchased', userId);
            await deleteDoc(studentRef);
            // Remove from user's transactions
            const transactionDocRef = doc(db, 'users', userId, 'transactions', productId);
            await deleteDoc(transactionDocRef);

            // Update local state to remove the product
            setProducts(products.filter(product => product.id !== productId));
            setRemove(false);
            toast.success('Access removed successfully!');
        } catch (error) {
            console.error('Error removing access:', error);
        }
    };

    if (loading) {
        return <LoadingData />
    }


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0] p-8">
                <div className="relative">
                    <Image className="rounded-full w-[72px] h-[72px]" src={userData.profilePic || "/images/DP_Lion.svg"} alt="DP" width={72} height={72} />
                    {userData.isPremium && (
                        <Image
                            className="absolute right-0 bottom-0"
                            src="/icons/winnerBatch.svg"
                            alt="Batch"
                            width={32}
                            height={32}
                        />
                    )}
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">{userData.name || "phodu user"}</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">{userData.userId || "phodu Id"}</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg px-8">Products</p>
            <div className="overflow-x-auto mx-6 border border-gray-200 rounded-lg">
                <table className="min-w-full border-none bg-white border">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-6 py-3 text-left text-sm font-medium text-gray-600">Products</th>
                            <th className="w-[20%] px-6 py-3 text-center text-sm font-medium text-gray-600">Price</th>
                            <th className="w-[20%] px-6 py-3 text-center text-sm font-medium text-gray-600">Purchased On</th>
                            <th className="w-[10%] px-6 py-3 text-center text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="w-1/2 px-6 py-4 flex items-left gap-3  text-[#9012FF] text-left underline text-sm font-medium">
                                    <Image
                                        src={product.image || "/icons/course.png"}
                                        width={42}
                                        height={42}
                                        alt="Course Icon"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="text-purple font-medium hover:underline">
                                        {product.name || "phodu course"}
                                    </span>
                                </td>
                                <td className="w-[20%] px-6 py-4 text-center text-gray-700">{product.price || "-"}</td>
                                <td className="w-[20%] px-6 py-4 text-center text-gray-700">{formatDate(product.date)}</td>
                                <td className="w-[10%] px-6 py-4 text-right text-gray-500">
                                    <Popover placement="bottom-end"
                                        isOpen={popoveropen1 === index}
                                        onOpenChange={(open) => open ? handlePopoverOpen1(index) : setPopoveropen1(null)}>
                                        <PopoverTrigger className="outline-none">

                                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] "
                                            >

                                                <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" className="outline-none" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md  shadow-lg">
                                            <button
                                                onClick={() => { setPopoveropen1(null); setRemove(true); setProductId(product.id); setProductType(product.type); }}
                                                className="flex flex-row h-[40px] w-full p-3  gap-2 hover:bg-[#FEE4E2] items-center">
                                                <Image
                                                    src="/icons/delete.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Delete"
                                                />
                                                <span className="text-[#DE3024] text-sm font-medium">Remove Access</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* MODAL FOR PAUSE */}
            {/* <Modal isOpen={pausedialog} onOpenChange={(isOpen) => !isOpen && setPausedialog(false)} hideCloseButton >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">
                                Pause

                            </h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setPausedialog(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>
                        <ModalBody >
                            <p className=" text-sm  pb-2 font-normal text-[#667085]">  Are you sure you want to pause this course?</p>
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => setPausedialog(false)}>Cancel</Button>
                            <Button onClick={() => setPausedialog(false)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] font-semibold text-sm  hover:bg-[#B0201A] border border-[#DE3024] rounded-md">Pause
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal > */}
            {/* MODAL FOR RESUME */}
            {/* <Modal
                isOpen={resume}
                onOpenChange={(isOpen) => !isOpen && setResume(false)}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">Live</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setResume(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        <ModalBody className="">
                            <p className=" text-sm  pb-2 font-normal text-[#667085]">Are you sure you want to live this.</p>
                        </ModalBody>

                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => setResume(false)}>Cancel</Button>
                            <Button onClick={() => setResume(false)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF]  font-semibold text-sm border border-[#9012FF]  hover:bg-[#6D0DCC]  rounded-md">Make it
                                live now</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal> */}
            {/* MODAL FOR REMOVE */}
            <Modal
                isOpen={remove}
                onOpenChange={(isOpen) => !isOpen && setRemove(false)}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        {/* Modal Header */}
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">Remove Acess</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setRemove(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        {/* Modal Body */}
                        <ModalBody className="">
                            <p className=" text-sm  pb-2 font-normal text-[#667085]">Are you sure you want to remove the access?</p>
                        </ModalBody>

                        {/* Modal Footer */}
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => setRemove(false)}>Cancel</Button>
                            <Button onClick={() => handleRemoveAccess(productId, productType)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] hover:bg-[#B0201A] font-semibold text-sm  rounded-md">Remove</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>


        </div>

    )
}
export default Products;
