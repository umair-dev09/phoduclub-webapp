import { useRef, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import styles from './video.module.css';
import Image from 'next/image';
import Video from 'next-video';
import Player from 'next-video/player';
import VideoPlayer from '@/components/DashboardComponents/CommunityComponents/VideoPlayer';
// import CourseVideoPlayer from './CourseVideoPlayer';

interface VideoContentProps {
    videoLink: string;
}
interface VdoCipherResponse {
    otp: string;
    playbackInfo: string;
}

function VideoContent({ videoLink }: VideoContentProps) {
    // ALL RELATED TO VIDEOCIPHER FUNCTION
    const [videocipherid, setVideocipherid] = useState('');
    const [videoData, setVideoData] = useState<VdoCipherResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [uploading, setUploading] = useState(false);

    const fetchVideoData = async () => {
        if (!videocipherid) {
            setError('Please enter a video ID');
            return;
        }

        setUploading(true);
        setError('');
        setVideoData(null);

        try {
            const response = await fetch('/api/Videocipher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId: videocipherid }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }

            const data: VdoCipherResponse = await response.json();

            // Log otp and playbackInfo to console
            console.log('Frontend: OTP:', data.otp);
            console.log('Frontend: PlaybackInfo:', data.playbackInfo);

            setVideoData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setUploading(false);
        }
    };
    const iframeSrc = videoData
        ? `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`
        : '';


    return (
        <div className='flex w-full pl-8'>
            {error && <p className="text-red-500">{error}</p>}
            {uploading && <p>Loading...</p>}
            {!uploading && videoData && (
                <div className="w-25 h-25 items-center justify-center flex">
                    <iframe
                        src={iframeSrc}
                        className=" w-25 h-25 rounded-lg"
                        allow="encrypted-media"
                        allowFullScreen
                        title="VdoCipher Video Player"
                    />
                </div>
            )}
            {/* <CourseVideoPlayer key={videoLink} videoSrc={videoLink} /> */}
        </div>
    );
}

export default VideoContent;
