import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

interface PopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
    return (
        <BottomSheet open={isOpen} onDismiss={onClose} className="bg-red-500 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Popup Content</h2>
            <p className="mb-4">Here is some content inside the BottomSheet.</p>
            <button onClick={onClose} className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
                Close
            </button>
        </BottomSheet>
    );
};

export default PopUp;
