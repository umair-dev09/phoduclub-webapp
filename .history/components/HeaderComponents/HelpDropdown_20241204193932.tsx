import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function HelpDropDown() {

    return (
        <div >
            <Popover placement='bottom-end'>
                <PopoverTrigger >
                    <div className="mx-2">
                        <button className="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center">
                            <Image src="/icons/help-circle.svg" width={16} height={16} alt="Help Icon" />
                        </button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-md w-[180px] px-0 shadow-md">
                    <button
                        className="flex items-center p-3 hover:bg-[#F2F4F7] w-full">
                        <Image src="/icons/message-question.svg" width={18} height={18} alt="Get more help Icon" />
                        <p className="text-sm text-[#0C111D] ml-2">Get more help</p>
                    </button>
                    <button className="flex items-center p-3 hover:bg-[#F2F4F7] w-full" >
                        <Image src="/icons/feedback.svg" width={18} height={18} alt="Send feedback Icon" />
                        <p className="text-sm text-[#0C111D] ml-2">Send feebback</p>
                    </button>
                </PopoverContent>
            </Popover>
        </div>
    );
}
export default HelpDropDown;
