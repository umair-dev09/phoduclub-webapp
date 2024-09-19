import '../Learn'
import Image from 'next/image';
import TopicsComp './TopicsComp';

function Course() {
    return (
        <div className='mx-8'>
            <div className="h-[80px] flex items-center ">
                <button className='flex items-center ml-8'>
                    <div
                        className="text-[#1D2939] h-[24px] w-[67px]"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                        Courses
                    </div>
                    <div className="ml-2 w-[24px]">
                        <Image
                            src="/icons/course-left.svg"
                            width={8}
                            height={8}
                            alt="left-arrow"
                        />
                    </div>
                </button>

                <div
                    className="text-[#667085] h-[24px] w-auto ml-4 pr-[10px]"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                >
                    BITSET Full Course
                </div>
            </div>

            {/* course buying */}
            < div className="h-[271px] bg-red-500 ml-8" >
                <div className="image"></div>
                <div className="description"></div>
            </div >
            {/* ------------------------------------------------------------------------------------------------------------------------------------------> */}

            < div className='flex flex-1 flex-col bg-blue-500 mt-8' >
                <div>
                    <h3>Course content</h3>
                </div>
                <div className='flex flex-row'>
                    <div>3 Lessons</div>
                    <div>4 Videos</div>
                    <div>2 Tests</div>
                </div>
                <div className='flex flex-col bg-white'>
                    <div className='flex items-center justify-left h-[56px] mx-3'>
                        <h4>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                    </div>
                    <div><hr /></div>
                    <div>
                        <TopicsComp />
                    </div>
                </div>
            </div >

        </div >
    );
}

export default Course;
