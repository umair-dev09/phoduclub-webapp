import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    const [isOpen, setIsOpen] = useState(true);

    return (

        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex w-[480px]  h-[261px] items-center justify-center p-4 rounded-1g">
                <DialogPanel className="bg-white rounded-2xl p-5 w-[500px]">
                    <div className="flex items-center justify-between mb-4 mx-6">
                        <h3 className="text-lg font-semibold">Select an Image</h3>
                        <button onClick={() => setIsOpen(false)}>
                            <Image src='/icons/cancel.svg' alt="cancel" width={18} height={18} />
                        </button>
                    </div>

                </DialogPanel>
            </div>

        </Dialog>
    );
}

export default Quiz;
