import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    const [isOpen, setIsOpen] = useState(false); // Initialize as closed

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <div>
            {/* Button to open the dialog */}


            {/* Dialog component */}
            <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="bg-white rounded-2xl p-5 w-[500px]">
                        <div className="flex items-center justify-between mb-4 mx-6">
                            <h3 className="text-lg font-semibold">Select an Image</h3>
                            <button onClick={closeDialog}>
                                <Image src='/icons/cancel.svg' alt="cancel" width={18} height={18} />
                            </button>
                        </div>
                        <div className="w-full h-px bg-[#F2F4F7] mb-4" />
                        <div className="flex flex-row mt-4 mx-6 mb-2 justify-center gap-7">
                            <button className="flex flex-col p-8 border rounded-lg border-[#EAECF0] gap-5 hover:bg-gray-100">
                                <Image src="/images/uploadImage.svg" alt="upload-image" width={110} height={110} />
                                <p className='text-sm font-medium'>Upload Image</p>
                            </button>
                            <button className="flex flex-col p-8 border rounded-lg border-[#EAECF0] gap-5 hover:bg-gray-100">
                                <Image src="/images/chooseAvatar.svg" alt="choose-avatar" width={110} height={110} />
                                <p className='text-sm font-medium'>Choose Avatar</p>
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default Quiz;
