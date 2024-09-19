import '../Learn'
import Image from 'next/image';
import TopicsComp from './TopicsComp';

function Course() {
    return (
        <div className='flex flex-col flex-1 px-8 overflow-auto'>
            <div className="h-[80px] flex items-center">
                <button className='flex items-center ml-1'>
                    <div
                        className="text-[#1D2939] h-[24px] w-auto"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                        Courses
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image
                            src="/icons/course-left.svg"
                            width={6}
                            height={12}
                            alt="left-arrow"
                        />
                    </div>
                </button>

                <div
                    className="text-[#667085] h-[24px] w-auto -ml-1"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                >
                    BITSET Full Course
                </div>
            </div>

            {/* course buying */}
            <div className="h-[271px] flex items-center gap-4">
                <div>
                    <Image
                        src="/icons/image.png"
                        width={437}
                        height={271}
                        alt="left-arrow"
                    />
                </div>
                <div
                    className="w-[800px] h-[271px] rounded-[16px] bg-[#FFFFFF]"
                    style={{ border: "1px solid #EAECF0" }}
                >
                    hy where are you
                </div>
            </div>

            {/* ------------------------------------------------------------------------------------------------------------------------------------------> */}

            < div className='flex flex-col mt-8' >
                <div>
                    <h3>Course content</h3>
                </div>
                <div className='flex flex-row mt-2'>
                    <div className=''>
                        <div>I</div>
                        <div>3 Lessons</div>
                    </div>

                </div>
                <div className='flex flex-col bg-white  border border-lightGrey rounded-xl mt-4'>
                    <div className='flex items-center justify-between h-[56px] mx-5'>
                        <div>
                            <h4>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                        </div>
                        <div>
                            <button>I</button>
                        </div>
                    </div>
                    <div><hr /></div>
                    <div>
                        <TopicsComp />
                    </div>
                </div>
                <div className='flex flex-col bg-white  border border-lightGrey rounded-xl mt-4'>
                    <div className='flex items-center justify-between h-[56px] mx-5'>
                        <div>
                            <h4>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                        </div>
                        <div>
                            <button>I</button>
                        </div>
                    </div>
                    <div><hr /></div>
                    <div>
                        <TopicsComp />
                    </div>
                </div>
                <div className='flex flex-col bg-white  border border-lightGrey rounded-xl mt-4'>
                    <div className='flex items-center justify-between h-[56px] mx-5'>
                        <div>
                            <h4>Lesson 1: Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                        </div>
                        <div>
                            <button>I</button>
                        </div>
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
