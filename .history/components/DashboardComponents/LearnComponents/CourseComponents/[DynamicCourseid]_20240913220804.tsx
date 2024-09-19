// pages/CourseComponents/[dynamiccourseid].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import React from "react";

const CoursePage = () => {
    const router = useRouter();
    const { dynamiccourseid } = router.query;

    // You might want to fetch course details here based on dynamiccourseid
    // const [courseData, setCourseData] = React.useState(null);
    // React.useEffect(() => {
    //     if (dynamiccourseid) {
    //         fetch(`/api/courses/${dynamiccourseid}`)
    //             .then(response => response.json())
    //             .then(data => setCourseData(data));
    //     }
    // }, [dynamiccourseid]);

    return (
        <div className='flex flex-col flex-1 px-8 overflow-auto'>
            {/* Display course ID */}
            <h1>Course ID: {dynamiccourseid}</h1>
            {/* You can render course details here based on dynamiccourseid */}
        </div>
    );
};

export default CoursePage;
