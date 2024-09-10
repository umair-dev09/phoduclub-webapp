import React from 'react';

interface PopUpProps {
    closeModal: () => void; // closeModal is a function that takes no arguments and returns nothing
}

const PopUp: React.FC<PopUpProps> = ({ closeModal }) => {
    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transform -translate-x-1/2 -translate-y-1/2">
                {/* Your modal content */}
            </div>

            <div className='fixed top-1/2 left-1/2 w-[30rem] transform-translate-x-1/2-translate-y-1/2'>
                <h2>POP-UP the page</h2>
                <p>This is another page</p>
                <button onClick={closeModal}>Save</button>
            </div>
        </>
    );
};

export default PopUp;
