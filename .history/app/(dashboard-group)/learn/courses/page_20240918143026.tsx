import MainCourse from '@/components/DashboardComponents/LearnComponents/CourseComponents/MainCourse';
import MainCourse2 from '@/components/DashboardComponents/LearnComponents/CourseComponents/MainCourse2';

export default function MyCourse() {
    return (
        <div className="flex flex-col flex-1 bg-[#f7f8fb]">
            <div className='flex flex-col w-full flex-1 mt-4 ml-6'>
                <div className='ml-6 mb-4 mt-2'>
                    <h3>My Courses</h3>
                </div>
                <div className='flex flex-1'>
                    <MainCourse />
                </div>
            </div>
            <div className='flex flex-col w-full flex-1 ml-6'>
                <div className='ml-6 mb-4 mt-5'>
                    <h3>Suggested</h3>
                </div>
                <div className='flex flex-1'>
                    <MainCourse2 />
                </div>
            </div>
        </div>
    );
}
