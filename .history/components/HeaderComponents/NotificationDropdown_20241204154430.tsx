import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function NotficationDropDown() {

  return (
    <div>
      <Popover backdrop='blur' placement='bottom-end'>
        <PopoverTrigger>
          <div class="relative flex flex-col">
            <div class="absolute w-[10px] h-[10px] bg-[#FF6262] rounded-full border border-white ml-[22px] mt-[1px]"></div>
            <button class="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center">
              <Image src="/icons/notification.svg" width={15} height={15} alt="Notification Icon" />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div class="flex flex-col bg-white rounded-lg border border-[#EAECF0] py-[12px] w-[360px] shadow-md shadow-[#EAECF0]">
            <div class="flex flex-row items-center justify-between mx-[14px]">
              <h3 class="font-semibold text-[15px]">Notifications</h3>
              <button>
                <p class="text-[#7400e0] text-[12px] font-semibold mt-[1px]">Mark all as read</p>
              </button>
            </div>
            <div class="w-full h-[1px] bg-[#F2F4F7] my-[10px]"></div>
            <div class="flex flex-col items-center mt-[40px] mb-[40px] mx-[15px]">
              <Image src="/icons/empty-notification.svg" width={100} height={100} alt="Empty Notification" />
              <h3 class="font-semibold text-[15px] mt-[12px] mb-[8px]">You're all caught up</h3>
              <p class="text-sm text-center text-gray-500">We’ll keep you updated on any future notifications</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>

  );
}
export default NotficationDropDown;