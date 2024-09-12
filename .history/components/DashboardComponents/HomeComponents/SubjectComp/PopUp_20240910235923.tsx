import React, { useEffect } from 'react';

interface BottomSheetProps {
    closeModal: () => void;
    subjectName: string | null;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ closeModal, subjectName }) => {
    const getContent = () => {
        switch (subjectName) {
            case 'Chemistry':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Chemistry</h2>
                        <p className="text-gray-700 mb-6">Detailed content for Chemistry.</p>
                    </>
                );
            case 'Maths':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Maths</h2>
                        <p className="text-gray-700 mb-6">Detailed content for Maths.</p>
                    </>
                );
            case 'Overall':
                return (
                    <>
                        <h2 className='text-2xl font-bold mb-4'>Overall</h2>
                        <p className='text-gray-700 mb-6'>Detailed content for Overall</p>
                    </>
                );
            case 'Physics':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Physics</h2>
                        <p className="text-gray-700 mb-6">Detailed content for Physics.</p>
                    </>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const bottomSheet = document.getElementById('bottomSheet');
            if (bottomSheet && !bottomSheet.contains(e.target as Node)) {
                closeModal();
            }
        };
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [closeModal]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end z-50">
            <div
                id="bottomSheet"
                className="w-full bg-white p-6 rounded-t-lg shadow-lg animate-slideUp"
                style={{ height: '98vh', maxHeight: '98vh', overflowY: 'auto' }}
            >
                {getContent()}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default BottomSheet;
