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


    const [videoData, setVideoData] = useState<VdoCipherResponse | null>(null);
    const [error, setError] = useState<string>("");
    const [uploading, setUploading] = useState(false);

    const videocipherid = "3f49cd28d53f41e38fb66aec32ad9c1c"; // Manually set the video ID here

    const fetchVideoData = async () => {
        if (!videocipherid) {
            setError("Please provide a video ID");
            return;
        }

        setUploading(true);
        setError("");
        setVideoData(null);

        try {
            const response = await fetch("/api/Videocipher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ videoId: videocipherid }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch video data");
            }

            const data: VdoCipherResponse = await response.json();

            // Log OTP and PlaybackInfo for debugging
            console.log("Frontend: OTP:", data.otp);
            console.log("Frontend: PlaybackInfo:", data.playbackInfo);

            setVideoData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchVideoData(); // Fetch video data when the component mounts or when videocipherid changes
    }, []); // Empty dependency array ensures it runs only once after initial mount
    const iframeSrc = videoData
        ? `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`
        : "";

    return (
        <div className="flex w-25 h-25 justify-center">
            {/* <video ref={videoNode} className="video-js vjs-theme-fantasy"
        controls
        preload="auto"
        autoPlay
        data-setup="{}">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

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

        </div>
    );
}

export default VideoContent;
