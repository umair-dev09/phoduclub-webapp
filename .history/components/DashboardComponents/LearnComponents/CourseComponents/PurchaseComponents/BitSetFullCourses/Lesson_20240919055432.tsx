"use client";

import Image from "next/image";

function Course() {


    return (
        <div className="flex flex-col  mx-1">
            <div className="mx-5 my-5">
                <div className="text-base font-medium">1. Welcome and Introduction</div>
                <div className="flex flex-row text-sm font-normal">
                    <div className="mr-1">
                        <Image
                            src="/icons/course-learn.svg"
                            alt="test-icon"
                            width={16}
                            height={16} />
                    </div>
                    <div>10:00</div>
                </div>
            </div>
            <div className="mx-5 my-5">
                <div className="text-base font-medium">1. Welcome and Introduction</div>
                <div className="flex flex-row text-sm font-normal">
                    <div className="mr-1">
                        <Image
                            src="/icons/test.svg"
                            alt="vedio -icon"
                            width={16}
                            height={16} />
                    </div>
                    <div>10:00</div>
                </div>
            </div>
            <div className="mx-5 my-5">
                <div className="text-base font-medium">1. Welcome and Introduction</div>
                <div className="flex flex-row text-sm font-normal">
                    <div className="mr-1">
                        <Image
                            src="/icons/vedio.svg"
                            alt="vedio -icon"
                            width={16}
                            height={16} />

                    </div>
                    <div>10:00</div>
                </div>
            </div>
        </div>
    );
}

export default Course;
