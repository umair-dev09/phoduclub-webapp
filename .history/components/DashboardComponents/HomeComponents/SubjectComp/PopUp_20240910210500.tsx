import React from 'react';

interface PopUpProps {
    closeModal: () => void;
    subjectName: string | null;
}

const PopUp: React.FC<PopUpProps> = ({ closeModal, subjectName }) => {
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
                        <h2 className='text-2x1 font-bold mb-4'>Overall</h2>
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

    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center">
            <div className="w-[30rem] bg-white p-6 rounded-lg shadow-lg">
                {getContent()}
                <button
                    onClick={closeModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopUp;

