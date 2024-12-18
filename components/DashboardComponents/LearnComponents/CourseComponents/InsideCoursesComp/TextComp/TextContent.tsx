
interface TextContentProps {
    lessonContent: string;
}

function TextContent({lessonContent}:TextContentProps) {
    return (
        <div className=" flex flex-col gap-[10px] flex-1">
            <div className=" font-bold text-1g text-[#1D2939] ">
                <span className="ml-8"> Content</span>
            </div>
            <div className='text-[#667085] text-base font-normal break-all ml-8 mr-4 mt-2 text-start'  dangerouslySetInnerHTML={{
                                    __html: lessonContent || '',
             }}/>

        </div>
    )
}
export default TextContent;