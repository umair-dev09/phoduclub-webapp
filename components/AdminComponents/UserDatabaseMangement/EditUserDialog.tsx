"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select, { SingleValue } from 'react-select';
import { useState, useEffect, useMemo } from "react";
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type EditUserDialogProps = {
    name: string;
    email: string;
    userIdd: string;
    authId: string;
    phonee: string;
    profilePic: string;
    isPremium: boolean;
    targetYear: string;
    targetExams: string[];
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}


type Option = {
    value: string;
    label: string;
};

function EditUserDialog({ open, onClose, name, email, userIdd, phonee, profilePic, isPremium, authId, targetExams, targetYear }: EditUserDialogProps) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState('');
    const [emailId, setEmailId] = useState('');
    const [pic, setPic] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedExams, setSelectedExams] = useState<Option[]>([]);
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");
    const exams: Option[] = [
        { value: 'BITSAT', label: 'BITSAT' },
        { value: 'JEE', label: 'JEE' },
        { value: 'SRMJEEE', label: 'SRMJEEE' },
        { value: 'COMEDK', label: 'COMEDK' },
        { value: 'KCET', label: 'KCET' },        { value: 'VITEEE', label: 'VITEEE' },
        { value: 'MET', label: 'MET' },
    ];
    const years = useMemo(() => [
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
    ], []);
    const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);
    type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
    };

    const isFormValid = firstName && lastName && userId && phone.length >= 12 && emailId;

    useEffect(() => {
        const nameParts = name.split(' ');
        setFirstName(nameParts[0] || '');
        setLastName(nameParts[1] || '');
        setUserId(userIdd);
        setEmailId(email);
        setPic(profilePic);
        setPhone(phonee);
        if (targetExams) {
            const defaultExams = targetExams.map((exam) => ({
                value: exam,
                label: exam,
            }));
            setSelectedExams(defaultExams);        }
        const defaultYear = years.find(year => year.value === targetYear);
        setSelectedYear(defaultYear || null);
    }, [name, email, userIdd, phonee, profilePic, targetExams, targetYear]);

    const handleEditUser = async () => {
        const fullName = `${firstName} ${lastName}`;
        try {
            await setDoc(doc(db, "users", authId), {
                name: fullName,
                phone,
                email: emailId,
                targetYear: selectedYear?.value,
                targetExams: selectedExams.map(exam => exam.value),
            }, { merge: true });
            toast.success("User Data Updated Successfully!");
            onClose();
        } catch (error) {
            console.error("Error updating or adding user in Firestore:", error);
            toast.error("Failed to save user. Please try again.");
        }

    }

    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
        //     <div className="fixed inset-0 flex items-center justify-center">
        //         <DialogPanel className="bg-white rounded-2xl w-[500px] max-h-[92%] overflow-y-auto">
        //             <div className="flex flex-col relative gap-6">
        //                 <div className="flex flex-col px-6 gap-6">
        //                     <div className="flex flex-row justify-between mt-6">
        //                         <h3 className="text-lg font-bold text-[#1D2939]">Edit User Details</h3>
        //                         <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                             <button onClick={onClose}>
        //                                 <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                             </button>
        //                         </button>
        //                     </div>
        //                     <div className="flex flex-col gap-3 items-center">
        //                         <div className="relative">
        //                             <Image className="rounded-full" src={pic || "/images/DP_Lion.svg"} alt="DP" width={130} height={130} />
        //                             {!isPremium && (
        //                                 <Image
        //                                     className="absolute right-0 bottom-0"
        //                                     src="/icons/winnerBatch.svg"
        //                                     alt="Batch"
        //                                     width={32}
        //                                     height={32}
        //                                 />
        //                             )}
        //                         </div>
        //                         {/* <span className="font-semibold text-sm text-[#9012FF]">Change</span> */}
        //                     </div>
        //                     {/* Input Fields */}
        //                     <div className="flex flex-row w-full gap-4">
        //                         <div className="flex flex-col gap-1 w-1/2 flex-grow">
        //                             <label className="text-[#1D2939] text-sm font-medium">First Name</label>
        //                             <input
        //                                 className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none"
        //                                 type="text"
        //                                 placeholder="First Name"
        //                                 value={firstName}
        //                                 onChange={(e) => setFirstName(e.target.value)}
        //                             />
        //                         </div>
        //                         <div className="flex flex-col gap-1 w-1/2 flex-grow">
        //                             <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
        //                             <input
        //                                 className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none"
        //                                 type="text"
        //                                 placeholder="Last Name"
        //                                 value={lastName}
        //                                 onChange={(e) => setLastName(e.target.value)}
        //                             />
        //                         </div>
        //                     </div>


        //                     <div className="flex flex-col gap-1 w-full ">
        //                         <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
        //                             Email Id
        //                         </label>
        //                         <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
        //                             <input
        //                                 className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
        //                                 type="text"
        //                                 placeholder="Email Id"
        //                                 value={emailId}
        //                                 onChange={(e) => setEmailId(e.target.value)}
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className="flex flex-col gap-1 w-full ">
        //                         <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
        //                             User Id
        //                         </label>
        //                         <div className="flex flex-row  w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
        //                             <input
        //                                 className="w-full text-sm py-2 px-4 font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
        //                                 type="text"
        //                                 placeholder="User Id"
        //                                 value={userId}
        //                                 // onChange={(e) => setUserId(e.target.value)}
        //                                 disabled={true}
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className="flex flex-col gap-1">
        //                         <label className="text-[#344054] text-sm font-medium">Mobile No.</label>
        //                         <PhoneInput
        //                             country="in"
        //                             value={phone}
        //                             onChange={(phone) => setPhone("+" + phone)}
        //                             inputProps={{ required: true }}
        //                             inputStyle={{
        //                                 width: "100%",
        //                                 borderRadius: "8px",
        //                                 border: "1px solid #D0D5DD",
        //                                 height: "42px",
        //                             }}
        //                         />
        //                     </div>

        //                     <div className='w-full'>
        //                         <p className='mb-1 font-medium text-sm'>Target Exam</p>
        //                         <Select
        //                             id="target-exam"
        //                             value={selectedExams}
        //                             onChange={(newValue) => setSelectedExams(newValue as Option[])}  // Explicit type casting
        //                             options={exams}
        //                             isMulti
        //                             placeholder="Select exams..."
        //                             styles={{
        //                                 option: (provided, state) => ({
        //                                     ...provided,
        //                                     color: 'black',
        //                                     backgroundColor: state.isFocused ? '#E39FF6' : 'white',
        //                                 }),
        //                                 multiValue: (provided) => ({
        //                                     ...provided,
        //                                     backgroundColor: 'white',
        //                                     border: '1.2px solid #D0D5DD',
        //                                     borderRadius: '8px',
        //                                     fontWeight: '500',
        //                                     marginRight: '7px',
        //                                 }),
        //                                 multiValueLabel: (provided) => ({
        //                                     ...provided,
        //                                     color: 'black',
        //                                 }),
        //                                 multiValueRemove: (provided) => ({
        //                                     ...provided,
        //                                     color: 'gray',
        //                                     cursor: 'pointer',
        //                                     ':hover': {
        //                                         backgroundColor: '#ffffff',
        //                                         borderRadius: '8px',
        //                                     },
        //                                 }),
        //                                 menu: (provided) => ({
        //                                     ...provided,
        //                                     backgroundColor: 'white',
        //                                 }),
        //                                 menuList: (provided) => ({
        //                                     ...provided,
        //                                     padding: '0',
        //                                 }),
        //                                 control: (provided) => ({
        //                                     ...provided,
        //                                     border: '1px solid #e6e6e6',
        //                                     borderRadius: '8px',
        //                                     padding: '4px',
        //                                     boxShadow: 'none',
        //                                     '&:hover': {
        //                                         outline: '1px solid #e5a1f5',
        //                                     },
        //                                 }),
        //                             }}
        //                         />
        //                     </div>

        //                     <div className='w-full'>
        //                         <label htmlFor="target-year" className='mb-1 font-medium text-sm'>Target Year</label>
        //                         <Select
        //                             id="target-year"
        //                             value={selectedYear}
        //                             onChange={setSelectedYear}
        //                             options={years}
        //                             placeholder="Select year..."
        //                             styles={{
        //                                 option: (provided, state: CustomState) => ({
        //                                     ...provided,
        //                                     color: 'black',
        //                                     backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
        //                                 }),
        //                                 singleValue: (provided) => ({
        //                                     ...provided,
        //                                     color: 'black',
        //                                     fontWeight: '500'
        //                                 }),
        //                                 control: (provided) => ({
        //                                     ...provided,
        //                                     border: '1px solid #e6e6e6',
        //                                     borderRadius: '8px',
        //                                     padding: '4px',
        //                                     boxShadow: 'none',
        //                                     '&:hover': {
        //                                         outline: '1px solid #e5a1f5',
        //                                     },
        //                                 }),

        //                             }}
        //                         />
        //                     </div>

        //                 </div>
        //                 <div className="flex justify-end gap-4 border-t p-4">
        //                     <button onClick={onClose} className="px-6 py-2 border rounded-md text-sm font-semibold hover:bg-[#F2F4F7]">
        //                         Discard
        //                     </button>
        //                     <button onClick={handleEditUser} disabled={!isFormValid} className={`px-6 py-2  text-white rounded-md text-sm ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'}`}>
        //                         Save Changes
        //                     </button>
        //                 </div>
        //             </div>
        //         </DialogPanel>
        //     </div>
        // </Dialog>
        <Modal isOpen={true} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton
            scrollBehavior={scrollBehavior}
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className="text-lg font-bold text-[#1D2939]">Edit User Details</h3>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-3 items-center">
                            <div className="relative">
                                <Image className="rounded-full" src={pic || "/images/DP_Lion.svg"} alt="DP" width={130} height={130} />
                                {!isPremium && (
                                    <Image
                                        className="absolute right-0 bottom-0"
                                        src="/icons/winnerBatch.svg"
                                        alt="Batch"
                                        width={32}
                                        height={32}
                                    />
                                )}
                            </div>
                            {/* <span className="font-semibold text-sm text-[#9012FF]">Change</span> */}
                        </div>
                        {/* Input Fields */}
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none"
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>


                        <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                Email Id
                            </label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                    type="text"
                                    placeholder="Email Id"
                                    value={emailId}
                                    onChange={(e) => setEmailId(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                User Id
                            </label>
                            <div className="flex flex-row  w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                <input
                                    className="w-full text-sm py-2 px-4 font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                    type="text"
                                    placeholder="User Id"
                                    value={userId}
                                    // onChange={(e) => setUserId(e.target.value)}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#344054] text-sm font-medium">Mobile No.</label>
                            <PhoneInput
                                country="in"
                                value={phone}
                                onChange={(phone) => setPhone("+" + phone)}
                                inputProps={{ required: true }}
                                inputStyle={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    border: "1px solid #D0D5DD",
                                    height: "42px",
                                }}
                            />
                        </div>

                        <div className='w-full'>
                            <p className='mb-1 font-medium text-sm'>Target Exam</p>
                            <Select
                                id="target-exam"
                                value={selectedExams}
                                onChange={(newValue) => setSelectedExams(newValue as Option[])}  // Explicit type casting
                                options={exams}
                                isMulti
                                placeholder="Select exams..."
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: 'black',
                                        backgroundColor: state.isFocused ? '#E39FF6' : 'white',
                                    }),
                                    multiValue: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                        border: '1.2px solid #D0D5DD',
                                        borderRadius: '8px',
                                        fontWeight: '500',
                                        marginRight: '7px',
                                    }),
                                    multiValueLabel: (provided) => ({
                                        ...provided,
                                        color: 'black',
                                    }),
                                    multiValueRemove: (provided) => ({
                                        ...provided,
                                        color: 'gray',
                                        cursor: 'pointer',
                                        ':hover': {
                                            backgroundColor: '#ffffff',
                                            borderRadius: '8px',
                                        },
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                    }),
                                    menuList: (provided) => ({
                                        ...provided,
                                        padding: '0',
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        border: '1px solid #e6e6e6',
                                        borderRadius: '8px',
                                        padding: '4px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            outline: '1px solid #e5a1f5',
                                        },
                                    }),
                                }}
                            />
                        </div>

                        <div className='w-full'>
                            <label htmlFor="target-year" className='mb-1 font-medium text-sm'>Target Year</label>
                            <Select
                                id="target-year"
                                value={selectedYear}
                                onChange={setSelectedYear}
                                options={years}
                                placeholder="Select year..."
                                styles={{
                                    option: (provided, state: CustomState) => ({
                                        ...provided,
                                        color: 'black',
                                        backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'black',
                                        fontWeight: '500'
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        border: '1px solid #e6e6e6',
                                        borderRadius: '8px',
                                        padding: '4px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            outline: '1px solid #e5a1f5',
                                        },
                                    }),

                                }}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" onClick={onClose} className="px-6 py-2 border rounded-md text-sm font-semibold hover:bg-[#F2F4F7]">
                            Discard
                        </Button>
                        <Button onClick={handleEditUser} disabled={!isFormValid} className={`px-6 py-2  text-white font-semibold rounded-md text-sm ${!isFormValid ? 'bg-[#CDA0FC]' : 'hover:bg-[#6D0DCC] bg-[#9012FF]'}`}>
                            Save Changes
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}
export default EditUserDialog;
