"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Addnewuser from "@/components/AdminComponents/RoleMangement/AddNewUser";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Remove from "@/components/AdminComponents/QuizInfoDailogs/Remove";
import { collection, getDocs, query, where, doc, getDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import LoadingData from "@/components/Loading";
import UserRolesView from "@/components/AdminComponents/RoleMangement/UserRolesView";
// Define types for quiz data
interface UserData {
    adminId: string;
    name: string;
    userId: string;
    phone: string;
    role: string;
    profilePic: string;
}

const fetchUsers = async (): Promise<UserData[]> => {
    const usersCollection = collection(db, 'admin');
    const usersSnapshot = await getDocs(usersCollection);

    const usersData = await Promise.all(
        usersSnapshot.docs.map(async (userDoc) => {
            const userData = userDoc.data();

            return {
                adminId: userData.adminId,
                name: userData.name,
                userId: userData.userId,
                phone: userData.phone,
                role: userData.role,
                profilePic: userData.profilePic,
            } as UserData;
        })
    );

    return usersData;
};



function rolemangement() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [adminIdd, setAdminIdd] = useState('');
    const [actionDialog, setActionDialog] = useState<string | null>(null);
    const [data, setData] = useState<UserData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [isAddUser, setisAddUser] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // For removing user dialog
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const openRemove = () => setIsRemoveOpen(true);
    const closeRemove = () => setIsRemoveOpen(false);

    const handleAddNewUser = (editMode = false) => {
        setisAddUser(true);
        setIsEditing(editMode);
        setFirstName('');
        setLastName('');
        setUserId('');
        setPhone('');
        setSelectedRole('');
    };

    const closeAddUser = () => {
        setisAddUser(false);
        setIsEditing(false);
    };

    // Real-time listener to fetch users and update state when data changes
    useEffect(() => {
        const usersCollection = collection(db, 'admin');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedUsers: UserData[] = snapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                    adminId: userData.adminId,
                    name: userData.name,
                    userId: userData.userId,
                    phone: userData.phone,
                    role: userData.role,
                    profilePic: userData.profilePic,
                } as UserData;
            });

            setUsers(updatedUsers);
            setData(updatedUsers); // Update data for pagination and search
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const handleTabClick = (path: string) => {
        router.push(path);
    };

    const handleEditDetails = (editMode = false, user?: UserData) => {
        setisAddUser(true);
        setIsEditing(editMode);
        if (user) {
            const nameParts = user.name.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts[1] || '');
            setUserId(user.userId);
            setPhone(user.phone);
            setSelectedRole(user.role);
            setAdminIdd(user.adminId);
            setActionDialog(null);
        }
    };
    // Check if all fields are filled
    // const isAddButtonDisabled = !uniqueId || !startDate || !endDate;
    const handleRemoveUser = async (adminId: string) => {
        try {
            await deleteDoc(doc(db, 'admin', adminId));
            toast.success('User Removed Successfully!');
            setActionDialog(null);
            close();
        } catch (error) {
            console.error('Error removing user from Firestore:', error);
            toast.error('Failed to remove user. Please try again.');
        }
    };

    useEffect(() => {
        let filteredUsers = users;

        // Filter by search term
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Update state with filtered and sorted quizzes
        setData(filteredUsers);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, users]);


    return (
        <div className="flex flex-col w-full  gap-4 p-8">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Users</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border justify-between border-solid border-[#D0D5DD] flex items-center p-3">
                        <span className="font-medium text-sm text-[#667085] ml-2">By Role</span>
                        <Image
                            src="/icons/by-role-arrow-down.svg"
                            width={20}
                            height={20}
                            alt="Select-date Button"
                        />
                    </button>
                    <button
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                        onClick={() => handleAddNewUser()} >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div>
                    <LoadingData />
                </div>
            ) : (
            <div className="flex flex-col overflow-y-auto">
                <div className="border border-[#EAECF0] rounded-xl ">
                    <table className="w-full bg-white rounded-xl ">
                        <thead>
                            <tr className="gap-[200px]">
                                <th className="w-[25%] text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                </th>
                                <th className=" w-[22%] text-start px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-start gap-1">
                                        <p>User Id</p>
                                    </div>
                                </th>
                                <th className=" w-[22%] text-strart px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-start gap-1">
                                        <p>Moblie No.</p>
                                    </div>
                                </th>
                                <th className=" w-[22%] px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-start gap-1">
                                        <p>Role</p>
                                    </div>
                                </th>
                                <th className="w-[9%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((users, index) => (
                                <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                    <td className="py-[12px]">
                                        <div className="flex flex-row ml-8 gap-[10px] min-w-[260px]">
                                            <Image className='rounded-full object-cover' src={users.profilePic || '/defaultAdminDP.jpg'} alt="DP" width={38} height={38} />
                                            <div className="flex items-start justify-center flex-col mb-[2px]">
                                                <div className="font-semibold text-sm">{users.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-start text-[#101828] text-sm "><span className="flex min-w-fit">{users.userId}</span></td>
                                    <td className="px-8 py-4 text-start text-[#101828] text-sm "><span className="flex min-w-fit">{users.phone}</span></td>
                                    <td className="px-8 py-4 text-start text-[#101828] text-sm">
                                    <span className="flex min-w-[200px]">
                                        <UserRolesView role={users.role}/>
                                     </span>   
                                        </td>
                                    <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                        <Popover placement="bottom-end"  >
                                            <PopoverTrigger>
                                                <button     onClick={() => setActionDialog(actionDialog === users.adminId ? null : users.adminId)}                                                >
                                                    <Image
                                                        src="/icons/three-dots.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="More Actions"
                                                    />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex px-0 rounded-md w-auto py-2">
                                                <div >
                                                    <button className="flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#F2F4F7] pl-4 pr-9"
                                                        onClick={() => handleEditDetails(true, users)} >
                                                        <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                        <span className="text-sm text-[#0C111D] font-normal">Edit details</span>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#F2F4F7] pl-4 pr-9"
                                                     onClick={() => handleRemoveUser(users.adminId)}>
                                                        <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            ))}                            
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Section */}
                    <div className="flex justify-end">
                        <div className="flex justify-right">
                            <PaginationSection
                                totalItems={data.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            )}
            {isRemoveOpen && < Remove onClose={closeRemove} open={true} />}
            {/* Dialog Component  for AddNewUser*/}
            {isAddUser && <Addnewuser close={closeAddUser} open={true} isEditing={isEditing} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} userId={userId} setUserId={setUserId} phone={phone} setPhone={setPhone} selectedRole={selectedRole} setSelectedRole={setSelectedRole} adminIdd={adminIdd} setAdminId={setAdminIdd} />}
            <ToastContainer />
        </div>
    );
}

// Pagination Component
function PaginationSection({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 4; // Maximum visible pages in pagination
        const visiblePagesAroundCurrent = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - visiblePagesAroundCurrent);
        let endPage = Math.min(totalPages, currentPage + visiblePagesAroundCurrent);

        if (currentPage <= visiblePagesAroundCurrent) {
            endPage = Math.min(totalPages, maxVisiblePages);
        } else if (currentPage + visiblePagesAroundCurrent >= totalPages) {
            startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }

        // First page with ellipsis if needed
        if (startPage > 1) {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                pages.push(
                    <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Visible pages
        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <PaginationItem key={page}>
                    <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        className={`${currentPage === page ? "bg-purple text-white hover:bg-purple hover:text-white" : "hover:bg-neutral-200"}`}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Last page with ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key="end-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <Pagination className="mt-4 justify-end">
            <PaginationContent className="bg-white border border-lightGrey rounded-md flex flex-row items-center">
                <PaginationItem>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50"
                    >
                        <PaginationPrevious />
                    </button>
                </PaginationItem>
                <div className="flex flex-row items-center gap-1">
                    {renderPageNumbers()}
                </div>
                <PaginationItem>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50"
                    >
                        <PaginationNext />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default rolemangement;