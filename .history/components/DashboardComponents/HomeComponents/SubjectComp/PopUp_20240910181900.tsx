import React from 'react';

interface PopUpProps {
    closeModal: () => void; // closeModal is a function that takes no arguments and returns nothing
}

const PopUp: React.FC<PopUpProps> = ({ closeModal }) => {
    return (
        <>
            <div className="fixed inset-0 bg-white flex justify-center items-center"></div>
            <div className="w-[30rem] bg-white p-6 rounded-lg shadow-lg">
                <h2>POP-UP the page</h2>
                <p>This is another page</p>
                <button onClick={closeModal}>Save</button>
            </div>
        </>
    );
};

export default PopUp;
