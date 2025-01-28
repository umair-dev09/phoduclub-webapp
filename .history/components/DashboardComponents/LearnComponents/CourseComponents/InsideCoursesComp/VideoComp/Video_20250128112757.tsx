import { useRef, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import styles from './video.module.css';
import Image from 'next/image';
import Video from 'next-video';
import Player from 'next-video/player';
import VideoPlayer from '@/components/DashboardComponents/CommunityComponents/VideoPlayer';
import CourseVideoPlayer from './CourseVideoPlayer';

interface VideoContentProps {
    videoLink: string;
}

function VideoContent({ videoLink }: VideoContentProps) {
    const videoData = {
        videoId: "3f49cd28d53f41e38fb66aec32ad9c1c",
    };

    const otp = "20160313versASE323LtZIl8VolXl74O8MC981CKx4RrRIzmcXII23pAwN7UYl3d"; // Replace with a dynamic value
    const playbackInfo = `eyJ2aWRlb0lkIjoi${videoData.videoId}ifQ==`; // Replace or compute dynamically

    const iframeSrc = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;


    return (
        <div className='flex w-full pl-8'>
            {/* <CourseVideoPlayer key={videoLink} videoSrc={videoLink} /> */}
            <iframe
                src={iframeSrc}
                className=" w-25 h-25 rounded-lg"
                allow="encrypted-media"
                allowFullScreen
                title="VdoCipher Video Player"
            />
        </div>
    );
}

export default VideoContent;
