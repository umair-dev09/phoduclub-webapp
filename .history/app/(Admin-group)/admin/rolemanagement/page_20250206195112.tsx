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
import Delete from '@/components/AdminComponents/RoleMangement/Delete';

// Define types for role data
interface RoleManagementInfo {
    adminId: string;
    name: string;
    userId: string;
    phone: string;
    role: string;
    profilePic: string;
}

type Option = "Admin" | "Customer Care" | "Teacher" | "Chief Modrator" | "Editor";

function RoleMangement() {
    const [firstName, setFirstName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedRole, setSelectedRole] = useState('Select Role');
    const [adminIdd, setAdminIdd] = useState('');
    const [actionDialog, setActionDialog] = useState<string | null>(null);
    const [data, setData] = useState<RoleManagementInfo[]>([]);
    const [users, setUsers] = useState<RoleManagementInfo[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [isAddUser, setisAddUser] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const isTextSearch = searchTerm.trim().length > 0;
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const closeDelete = () => {
        setIsDeleteOpen(false);
        setUserToDelete(null);
    };
    const [userToDelete, setUserToDelete] = useState<RoleManagementInfo | null>(null);
    const [popoverOpen, setPopoverOpen] = useState<number | null>(null);
    // For removing user dialog
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const openRemove = () => setIsRemoveOpen(true);
    const closeRemove = () => setIsRemoveOpen(false);

    const handleAddNewUser = () => {
        setisAddUser(true);
        setIsEditing(false);
        setFirstName('');
        setLastName('');
        setUserId('');
        setPhone('');
        setAdminIdd('');
        setSelectedRole('Select Role');
        setProfilePic('');
    };

    const closeAddUser = () => {
        setisAddUser(false);
        setIsEditing(false);
    };

    // Real-time listener to fetch users and update state when data changes
    useEffect(() => {
        const usersCollection = collection(db, 'admin');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedUsers: RoleManagementInfo[] = snapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                    adminId: userData.adminId,
                    name: userData.name,
                    userId: userData.userId,
                    phone: userData.phone,
                    role: userData.role,
                    profilePic: userData.profilePic,
                } as RoleManagementInfo;
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

    const handleEditDetails = (user?: RoleManagementInfo) => {
        setisAddUser(true);
        setIsEditing(true);
        if (user) {
            const nameParts = user.name.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts[1] || '');
            setUserId(user.userId);
            setProfilePic(user.profilePic);
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

        // Update state with filtered and sorted roles
        setData(filteredUsers);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, users]);

    const statusMapping: Record<Option, string[]> = {
        'Admin': ['admin'],
        'Customer Care': ['customercare'],
        'Teacher': ['teacher'],
        'Chief Modrator': ['chiefmodrator'],
        'Editor': ['editor']  // Map 'Canceled' to 'ended' status
    };

    const options: Option[] = ["Admin", "Customer Care", "Teacher", "Chief Modrator", "Editor"];

    // Update the type to use a more specific index signature
    const [checkedState, setCheckedState] = useState<Record<Option, boolean>>(
        options.reduce((acc, option) => {
            acc[option] = false;
            return acc;
        }, {} as Record<Option, boolean>)
    );

    const selectedCount = Object.values(checkedState).filter(Boolean).length;

    // Inside the useEffect for filtering
    useEffect(() => {
        let filteredUsers = users;

        // Filter by search term
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected roles
        const selectedRoles = Object.keys(checkedState)
            .filter(role => checkedState[role as Option]) as Option[]; // Cast keys to 'Option'
        if (selectedRoles.length > 0) {
            filteredUsers = filteredUsers.filter(user =>
                selectedRoles.includes(user.role as Option) // Ensure user.role is cast to 'Option'
            );
        }

        // Update state with filtered and sorted users
        setData(filteredUsers);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, users, checkedState]);

    // Modify the toggleCheckbox function to use a type assertion
    const toggleCheckbox = (option: Option) => {
        setCheckedState(prev => ({
            ...prev,
            [option]: !prev[option as Option]  // Add type assertion here
        }));
    };
    const handlePopoverOpen = (index: number) => {
        setPopoverOpen(index);
    };
    return (
        <div className="flex flex-col w-full gap-4 p-8 overflow-y-auto">
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

                    {/* Select Role Button */}
                    <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <button className="h-[44px] w-[126px] hover:bg-[#F2F4F7] rounded-md bg-[#FFFFFF] outline-none border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer">
                                <p className={`flex flex-row font-medium text-sm ${selectedCount > 0 ? 'text-[#182230]' : 'text-[#667085]'}`}>
                                    {selectedCount > 0 ? `${selectedCount} selected` : 'By Role'}
                                </p>
                                <Image
                                    src="/icons/selectdate-Arrowdown.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow-Down Button"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-full h-auto px-0 bg-white border border-lightGrey rounded-md">
                            <div>
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex flex-row items-center w-full py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
                                        onClick={() => toggleCheckbox(option)}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-4 h-4 border border-[#D0D5DE] rounded-sm ${checkedState[option] ? 'bg-purple border-purple' : 'bg-white'}`}
                                        >
                                            {checkedState[option] && (
                                                <Image src="/icons/check.svg" alt="choose" width={12} height={12} />
                                            )}
                                        </div>
                                        <p className="text-sm text-[#0C111D] font-normal">{option}</p>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Add New User Button */}
                    <button
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center transition-colors duration-150 hover:bg-[#6D0DCC]"
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
                <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row gap-2">
                            {Object.keys(checkedState)
                                .filter(option => checkedState[option as Option])
                                .map((option) => (
                                    <div
                                        key={option}
                                        className="flex flex-row items-center w-fit mb-4 px-3 py-2 gap-1 text-xs font-medium bg-[#EDE4FF] rounded-[0.375rem]"
                                    >
                                        {option}
                                        <button onClick={() => toggleCheckbox(option as Option)}>
                                            <Image src='/icons/multiplication-sign.svg' alt="close" width={16} height={16} />
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                        {Object.values(checkedState).some(Boolean) && (
                            <button
                                className="text-sm text-[#9012FF] font-semibold"
                                onClick={() => setCheckedState(
                                    options.reduce((acc, option) => {
                                        acc[option] = false;
                                        return acc;
                                    }, {} as Record<Option, boolean>)
                                )}
                            >
                                clear all
                            </button>
                        )}
                    </div>
                    <div className="border border-[#EAECF0] rounded-xl">
                        <table className="w-full bg-white rounded-xl">
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
                                {data.length > 0 ? (
                                    currentItems.map((users, index) => (
                                        <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                            <td className="py-[12px]">
                                                <button onClick={() => handleTabClick(`/admin/rolemanagement/${users.name.toLowerCase().replace(/\s+/g, '-')}?rId=${users.adminId}`)} className="flex flex-row items-center ml-8 gap-[10px] min-w-[260px]">
                                                    <Image className='rounded-full object-cover' src={users.profilePic || '/defaultAdminDP.jpg'} alt="DP" width={38} height={38} />
                                                    <div className="flex items-start justify-center flex-col mb-[2px]">
                                                        <div className="font-semibold text-sm text-[#9012FF] underline whitespace-nowrap">{users.name || "phodu admin"}</div>
                                                    </div>
                                                </button>
                                            </td>
                                            <td className="px-8 py-4 text-start text-[#101828] text-sm "><span className="flex min-w-fit">{users.userId || "phodu id"}</span></td>
                                            <td className="px-8 py-4 text-start text-[#101828] text-sm "><span className="flex min-w-fit">{users.phone || "-"}</span></td>
                                            <td className="px-8 py-4 text-start text-[#101828] text-sm">
                                                <span className="flex min-w-[200px]">
                                                    <UserRolesView role={"phodu role"} />

                                                </span>
                                            </td>
                                            <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                                <Popover placement="bottom-end"
                                                    isOpen={popoverOpen === index}
                                                    onOpenChange={(open) => open ? handlePopoverOpen(index) : setPopoverOpen(null)}>
                                                    <PopoverTrigger>
                                                        <button onClick={() => setActionDialog(actionDialog === users.adminId ? null : users.adminId)}                                                >
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
                                                                onClick={() => { handleEditDetails(users); setPopoverOpen(null); }} >
                                                                <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                                <span className="text-sm text-[#0C111D] font-normal">Edit details</span>
                                                            </button>
                                                            <button className=" flex flex-row items-center justify-start w-full py-2 gap-2 hover:bg-[#FEE4E2]  pl-4 pr-9"
                                                                // onClick={() => handleRemoveUser(users.adminId)}>
                                                                onClick={() => {
                                                                    setUserToDelete(users);
                                                                    setIsDeleteOpen(true);
                                                                    setPopoverOpen(null);
                                                                }}
                                                            >
                                                                <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                            </button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className='border-t border-lightGrey'>
                                        <td colSpan={5} className="text-center py-8">
                                            {isTextSearch && (
                                                <p className="text-[#667085] text-sm">
                                                    No chapters found for &quot;{searchTerm}&quot;
                                                </p>
                                            )}
                                            {!isTextSearch && (
                                                <p className="text-[#667085] text-sm">
                                                    No chapters found
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                )}
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
            {/* Dialog Component  for AddNewUser*/}
            {isAddUser && <Addnewuser close={closeAddUser} open={true} isEditing={isEditing} profilePic={profilePic} setProfilePic={setProfilePic} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} userId={userId} setUserId={setUserId} phone={phone} setPhone={setPhone} selectedRole={selectedRole} setSelectedRole={setSelectedRole} adminIdd={adminIdd} setAdminId={setAdminIdd} />}
            {isDeleteOpen && userToDelete && (
                <Delete
                    onClose={closeDelete}
                    open={true}
                    authId={userToDelete.adminId}
                    name={userToDelete.name}
                />
            )}
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

export default RoleMangement;