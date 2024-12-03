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
            <ReactQuill
                modules={modules}
                value={value}
                onChange={onChangeHandler}
                placeholder="Enter the message..........."
                className="border-0 outline-none "
            />
        </div>
    );
}

export default Dashboard;
