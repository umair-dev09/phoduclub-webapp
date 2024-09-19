import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

function Quiz() {
    const [isOpen, setIsOpen] = useState(true);

    const closeDialog = () => {
        setIsOpen(false); // Close dialog function
    };

    return (
        <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
            {/* Clicking the backdrop triggers the onClose, which closes the dialog */}
            <div className="fixed inset-0 bg-black/30" onClick={closeDialog} />

            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-2xl p-5 w-[500px]" onClick={(e) => e.stopPropagation()}>
                    {/* Clicking inside the dialog panel will not close the dialog */}
                    {/* Dialog content goes here */}
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Quiz;
