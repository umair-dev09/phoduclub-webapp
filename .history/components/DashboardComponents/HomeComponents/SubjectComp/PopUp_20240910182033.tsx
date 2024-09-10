import React from 'react';

interface PopUpProps {
    closeModal: () => void; // closeModal is a function that takes no arguments and returns nothing
}

const PopUp: React.FC<PopUpProps> = ({ closeModal }) => {
    return (
        <>
            <div className="fixed inset-0 bg-white flex justify-center items-center"></div>
            <div className="w-[30rem] p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">POP-UP the page</h2>
                <p className="text-gray-700 mb-6">This is another page</p>
                <button
                    onClick={closeModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Save</button>
            </div>
        </>
    );
};

export default PopUp;
