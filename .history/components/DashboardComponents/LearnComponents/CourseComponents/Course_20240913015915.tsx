import '../Learn'
import Image from 'next/image';
function Course() {
    return (
        <div className='mx-8'>
            <div className=" ml-[32px] h-[80px]">
                <button>
                    <div className="text-[#1D2939]  h-[24px] w-[144px]""
                        style={{ fontSize: '16px', fontWeight: '600', paddingTop: "28px" }}>
                        Course

                    </div>
                    <div>
                        <Image
                            src="/icons/course-left.svg"
                            width={8}
                            height={8}
                            alt="left-arrow"

                        />
                    </div>

                </button>

                <div className="text-[#667085] h-[24px] w-[144px]"
                    style={{ fontSize: '16px', fontWeight: '500' }}>
                    BITSET Full Course</div>
            </div >
        <div className="h-[271px] bg-red-500">
            <div className="image"></div>
            <div className="description"></div>
        </div>
    {/* ------------------------------------------------------------------------------------------------------------------------------------------> */ }

    <div className='flex flex-1 flex-col bg-blue-500'>
        <div>
            <h3>Course content</h3>
        </div>
        <div className='flex flex-row'>
            <div>3 Lessons</div>
            <div>4 Videos</div>
            <div>2 Tests</div>
        </div>
        <div></div>
    </div>

        </div >
    );
}

export default Course;
