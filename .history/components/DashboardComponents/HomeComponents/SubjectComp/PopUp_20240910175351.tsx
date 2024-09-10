import React from 'react';

interface PopUpProps {
    closeModal: () => void; // closeModal is a function that takes no arguments and returns nothing
}

const PopUp: React.FC<PopUpProps> = ({ closeModal }) => {
    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 top:50% left:50%"></div>
            <div className='fixed'>
                <h2>POP-UP the page</h2>
                <p>This is another page</p>
                <button onClick={closeModal}>Save</button>
            </div>
        </>
    );
};

export default PopUp;
