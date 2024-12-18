// File: page.tsx
"use client";

import dynamic from 'next/dynamic';

const CreateCourse = dynamic(() => import('./CreateCourseComponent'), {
  ssr: false,
});

const CreateCoursePage = () => {
  return <CreateCourse />;
};

export default CreateCoursePage;
