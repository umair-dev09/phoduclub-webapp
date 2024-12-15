import { useRef, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import styles from './video.module.css';
import Image from 'next/image';
import Video from 'next-video';
import Player from 'next-video/player';

interface VideoContentProps {
    videoId: string;
}

function VideoContent({videoId}:VideoContentProps) {

    return (

        <div className='flex w-full relative pl-8'>
            
           <Video playbackId={videoId}/>

        </div>
    );
}

export default VideoContent;
