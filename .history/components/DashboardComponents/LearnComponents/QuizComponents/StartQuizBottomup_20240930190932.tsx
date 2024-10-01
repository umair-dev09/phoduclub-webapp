import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

// Define the props interface
interface AppProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
}

const App: React.FC<AppProps> = ({ isOpen, toggleDrawer }) => {
    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="rounded-tl-md rounded-tr-md"
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="flex justify-between items-center p-4">
                    <h2>This is the Drawer content!</h2>
                    <button
                        onClick={toggleDrawer}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Close
                    </button>
                </div>
                {/* Add more content here if needed */}
            </Drawer>
        </>
    );
};

export default App;
