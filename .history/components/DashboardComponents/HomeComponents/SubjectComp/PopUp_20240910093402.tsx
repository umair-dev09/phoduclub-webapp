// components/Popup.tsx
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { useState } from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
    return (
        <BottomSheet open={isOpen} onDismiss={onClose} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Popup Content</h2>
            <p className="mb-4">Here is some content inside the BottomSheet.</p>
            <button onClick={onClose} className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
                Close
            </button>
        </BottomSheet>
    );
};

export default Popup;
