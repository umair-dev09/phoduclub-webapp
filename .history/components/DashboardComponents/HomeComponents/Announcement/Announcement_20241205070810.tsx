import Announced from '@/components/DashboardComponents/HomeComponents/Announcement/announcementComp/announceComp';
import Image from 'next/image';

function Announcement() {
    return (
        <div className="flex flex-1">
            <div className="flex flex-1 flex-col items-center justify-center ">
                <Image
                    src='/images/no_announcement_img.svg'
                    alt='No announcement image'
                    width={140}
                    height={140}
                />
                <h3 className="text-lg font-bold">No announcements for now</h3>
                <p className="text-sm font-normal text-center">Will show relevant announcements here</p>
            </div>
            <div>
                <Announced />
            </div>
        </div>
    )
}

export default Announcement;
