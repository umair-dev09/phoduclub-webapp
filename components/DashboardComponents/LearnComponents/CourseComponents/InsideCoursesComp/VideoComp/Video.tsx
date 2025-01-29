import { useRef, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import styles from './video.module.css';
import Image from 'next/image';
import Video from 'next-video';
import Player from 'next-video/player';
import VideoPlayer from '@/components/DashboardComponents/CommunityComponents/VideoPlayer';
import CourseVideoPlayer from './CourseVideoPlayer';

interface VideoContentProps {
    videoId: string;
}

function VideoContent({ videoId }: VideoContentProps) {

    return (
        <div className='flex w-full pl-8'>
            <CourseVideoPlayer videoId={videoId} />
        </div>
    );
}

export default VideoContent;
