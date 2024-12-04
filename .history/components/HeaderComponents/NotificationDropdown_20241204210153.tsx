import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function NotficationDropDown() {

  return (
    <div>
      <Popover placement='bottom-end'>
        <PopoverTrigger>
          <div className="relative flex flex-col hover:bg-[#F2F4F7] rounded-full">
            <div className="absolute w-[10px] h-[10px] bg-[#FF6262] rounded-full border border-white ml-[22px] mt-[1px]"></div>
            <button className="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center ">
              <Image src="/icons/notification.svg" width={15} height={15} alt="Notification Icon" />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col bg-white rounded-lg   border border-[#EAECF0] py-[12px] w-[360px] shadow-md shadow-[#EAECF0]">

          <div className="flex flex-row items-center justify-between w-full ">
            <h3 className="font-semibold text-[15px]">Notifications</h3>
            <button>
              <p className="text-[#7400e0] text-[12px] font-semibold mt-[1px]">Mark all as read</p>
            </button>
          </div>
          <div className="w-full h-[1px] bg-[#F2F4F7] my-[10px]"></div>
          <div className="flex flex-col items-center mt-[40px] mb-[40px] mx-[15px]">
            <Image src="/icons/empty-notification.svg" width={100} height={100} alt="Empty Notification" />
            <h3 className="font-semibold text-[15px] mt-[12px] mb-[8px]">You're all caught up</h3>
            <p className="text-sm text-center text-gray-500">We’ll keep you updated on any future notifications</p>
          </div>

        </PopoverContent>
      </Popover>
    </div>

  );
}
export default NotficationDropDown;