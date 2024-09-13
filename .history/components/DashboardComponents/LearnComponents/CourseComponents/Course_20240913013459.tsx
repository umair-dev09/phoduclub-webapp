import '../Learn'
import Image from 'next/image';
function Course() {
    return (
        <div>
            <div className=" ml-[32px] h-[80px]">
                <div className="text-[#1D2939]"
                    style={{ fontSize: '16px', fontWeight: '600', paddingTop: "28px" }}>
                    Course
                </div>
                <div className="div">
                    <Image
                        src="/icons/course-left"
                        width={20}
                        height={20}
                        alt="left-arrow"
                    />
                </div>
                <div className="div"></div>
            </div>

        </div>
    );
}

export default Course;
