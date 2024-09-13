import '../Learn'
import Image from 'next/image';
import TopicsComp from './TopicsComp';

function Course() {
    return (
        <div className='flex flex-col flex-1 mx-8'>
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
            < div className="h-[271px] flex items-center " >
                <div>
                    <Image
                        src="/icons/image.png"
                        width={437}
                        height={271}
                        alt="left-arrow"
                    />
                </div>
                <div
                    className="w-[651px] h-[271px] border border-[#EAECF0] rounded-[16px] gap-[10px] bg-slate-500"
                    style={{ color: "#9012FF" }}

                >
                    hy wheere are you
                </div>

            </div >
            {/* ------------------------------------------------------------------------------------------------------------------------------------------> */}

            < div className='flex flex-col ml-1' >
                <div>
                    <h3>Course content</h3>
                </div>
                <div className='flex flex-row'>
                    <div>3 Lessons</div>
                    <div>4 Videos</div>
                    <div>2 Tests</div>
                </div>
                <div className='flex flex-col bg-white  border border-lightGrey rounded-2'>
                    <div className='flex items-center justify-between h-[56px] mx-4'>
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
