"use client";
import { signOut } from "firebase/auth";
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Dashboard() {
    const router = useRouter();
    const [value, setValue] = useState('');
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
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

    return (
        <div>
            {/* Other component code */}
            <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
            <ReactQuill
                modules={modules}
                value={formik.values.message}
                onChange={ }
                placeholder="Enter the message..........."
            />
        </div>
    );
}

export default Dashboard;
