// "use client";
// import { signOut } from "firebase/auth";
// import { auth } from '@/firebase';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill-new';
// import 'react-quill/dist/quill.snow.css';

// function Dashboard() {
//     const router = useRouter();
//     const [value, setValue] = useState('');
//     const modules = {
//         toolbar: [
//             [{ header: [1, 2, 3, 4, 5, 6, false] }],
//             ["bold", "italic", "underline", "strike", "blockquote"],
//             [{ align: ["right", "center", "justify"] }],
//             [{ list: "ordered" }, { list: "bullet" }],  // Ensure this line exists
//             ["link", "image"],
//             [{ indent: "-1" }, { indent: "+1" }]
//         ],
//     };

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             router.push('/admin-login');
//         } catch (error) {
//             console.error("Error logging out:", error);
//         }
//     };
//     const onChangeHandler = (content: React.SetStateAction<string>, delta: any, source: any, editor: any) => {
//         setValue(content);  // Update the state with the content from the editor
//     };
//     return (
//         <div>
//             {/* Other component code */}
//             <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">
//                 Logout
//             </button>
//             <ReactQuill
//                 modules={modules}
//                 value={value} // Use the state value
//                 onChange={onChangeHandler} // Use the defined change handler
//                 placeholder="Enter the message..........."
//             />
//         </div>
//     );
// }

// export default Dashboard;
"use client";
import { signOut } from "firebase/auth";
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading editor...</p>
});

function Dashboard() {
    const router = useRouter();
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image']
        ]
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/admin-login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const onChangeHandler = (content: string) => {
        setValue(content);
    };

    return (
        <div>
            <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded"
            >
                Logout
            </button>
            <ReactQuill
                modules={modules}
                value={value}
                onChange={onChangeHandler}
                placeholder="Enter the message..........."
            />
        </div>
    );
}

export default Dashboard;