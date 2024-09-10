import React from 'react';

interface PopUpProps {
    closeModal: () => void;
    subjectName: string | null;
}

const PopUp: React.FC<PopUpProps> = ({ closeModal, subjectName }) => {
    return (
        <div className="fixed inset-0 bg-white">
            <div className="flex justify-center items-center h-full">
                <div className="w-[30rem] bg-customWhite p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">{subjectName}POP-UP</h2>
                    <p className="text-gray-700 mb-6">This is {subjectName}</p>
                    <button
                        onClick={closeModal}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
