import React from 'react';

interface PopUpProps {
    closeModal: () => void; // closeModal is a function that takes no arguments and returns nothing
}

const PopUp: React.FC<PopUpProps> = ({ closeModal }) => {
    return (
        <>
            <h2>POP-UP the page</h2>
            <p>This is another page</p>
            <button onClick={closeModal}>Save</button>
        </>
    );
};

export default PopUp;
