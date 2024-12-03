"use client";
import { signOut } from "firebase/auth";
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';

function Dashboard() {
    const router = useRouter();
    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],  // Ensure this line exists
            ["image"],

        ],
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/admin-login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    const onChangeHandler = (content: React.SetStateAction<string>, delta: any, source: any, editor: any) => {
        setValue(content);  // Update the state with the content from the editor
    };
    return (
        <div>
            {/* Other component code */}
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
            <div className="bg-[#F7F8FB] border border-solid border-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px]">

                <ReactQuill
                    modules={modules}
                    value={value}
                    onChange={onChangeHandler}
                    placeholder="Enter the message..........."
                    className=" text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic"
                    style={{
                        minHeight: "10px", // Initial height
                        maxHeight: "150px", // Maximum height before scrolling
                        overflowY: "auto",  // Enable scrolling if content exceeds max height
                        padding: "1rem",   // Padding to create space inside the editor
                        border: 'none',
                        fontStyle: 'normal',
                    }}
                />
            </div>
        </div>
    );
}

export default Dashboard;
