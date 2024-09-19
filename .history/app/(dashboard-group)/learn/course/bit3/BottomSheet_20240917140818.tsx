import React from 'react';

interface BottomSheetProps {
    closeModal: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-end justify-center p-4 z-50">
            <div className="bg-white rounded-t-2xl p-5 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-[#1D2939]">Quiz Bottom Sheet</span>
                    <button onClick={closeModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6L18 18" stroke="#1D2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-[#667085]">This is the bottom sheet for starting the quiz.</p>
                    {/* Add more content or actions here */}
                </div>
            </div>
        </div>
    );
}

export default BottomSheet;
