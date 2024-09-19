import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            {/* Backdrop */}
            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            {/* Dialog Wrapper */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-2xl p-5 w-[480px] h-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                        <button onClick={() => setIsOpen(false)}>
                            <Image src='/icons/cancel.svg' alt="cancel" width={18} height={18} />
                        </button>
                    </div>
                    <div className='flex-row, flex gap-[5px]'>
                        <span className='flex flex-rowitems-center'>
                            Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview

                            Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
                        </span>
                        <span className='flex flex-row items-center'>
                            Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview

                            Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
                        </span>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Quiz;
