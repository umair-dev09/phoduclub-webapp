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
                className="rounded-md h-[98vh]"
            >
                {/* Drawer content goes here */}
                <h2>This is the Drawer content!</h2>
            </Drawer>
        </>
    );
};

export default App;
