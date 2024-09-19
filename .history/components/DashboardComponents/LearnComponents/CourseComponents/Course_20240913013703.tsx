import '../Learn'
import Image from 'next/image';
function Course() {
    return (
        <div>
            <div className=" ml-[32px] h-[80px]">
                <button>
                    <div className="text-[#1D2939]"
                        style={{ fontSize: '16px', fontWeight: '600', paddingTop: "28px" }}>
                        Course


                        <Image
                            src="/icons/course-left"
                            width={24}
                            height={24}
                            alt="left-arrow"
                        />
                    </div>
                </button>

                <div className="div"></div>
            </div>

        </div>
    );
}

export default Course;
