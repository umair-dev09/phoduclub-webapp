import CoursesList from '@/components/DashboardComponents/LearnComponents/CourseComponents/CoursesList';
import MyCourses from '@/components/DashboardComponents/LearnComponents/CourseComponents/MyCourses';

export default function MyCourse() {
    return (
        <div className="flex flex-col ">
            <div className='flex flex-col w-full flex-1 mt-4 ml-6'>

                <div className='flex flex-1'>
                    <MyCourses />
                </div>
            </div>
            <div className='flex w-full  ml-6'>
                <div className='flex '>
                    <CoursesList />
                </div>
            </div>
        </div>
    );
}