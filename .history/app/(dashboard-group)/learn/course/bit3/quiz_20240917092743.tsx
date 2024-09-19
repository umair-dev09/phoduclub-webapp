import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';


function Quiz() {
    const [isOpen, setIsOpen] = useState(true);

    return (

        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-2xl p-5 w-[500px]">

                </DialogPanel>
            </div>

        </Dialog>
    );
}

export default Quiz;
