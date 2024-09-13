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

                <div className="div"></div>
            </div>
            <div className="h-[271px] bg-red-500">
                <div className="image"></div>
                <div className="description"></div>
            </div>

        </div>
    );
}

export default Course;
