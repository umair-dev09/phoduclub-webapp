import React from 'react';

interface BottomSheetProps {
    closeModal: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ closeModal }) => {
    return (
        <div className={`fixed bottom-0 left-0 w-full h-[98vh] bg-white rounded-t-2xl grid grid-rows-[69px_1fr_76px] transform ${showBottomSheet ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500 ease-in-out`}>
            <div className="p-5 flex justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Quiz Bottom Sheet</span>
                <button onClick={closeModal}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="#1D2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Add more content or actions here */}

        </div>

    );
}

export default BottomSheet;
