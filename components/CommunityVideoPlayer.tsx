import { useEffect, useRef, useState } from "react";
import videojs from "video.js"; // Import video.js
import "video.js/dist/video-js.css"; // Core Video.js styles
import "@videojs/themes/dist/fantasy/index.css"; // Fantasy theme styles
import Player from "video.js/dist/types/player"; // Import Player type
import Image from "next/image";
interface VideoPlayerProps {
  videoSrc: string;
}

function CommunityVideoPlayer({ videoSrc }: VideoPlayerProps) {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null); // Use VideoJsPlayer type from videojs namespace
  const [duration, setDuration] = useState("00:00"); // State for video duration

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (videoNode.current) {
      playerRef.current = videojs(videoNode.current, {
        // controls: true,
        controlBar: {
          playToggle: false, // Show play button
          volumePanel: false, // Hide volume
          remainingTimeDisplay: false, // Hide remaining time
          progressControl: false, // Hide progress bar
          fullscreenToggle: false, // Hide fullscreen
          pictureInPictureToggle: false, // Disable PiP button
        },
        responsive: true,
        fluid: true,
        // aspectRatio: "2:2", // Set aspect ratio
      });

      // Add Fantasy theme
      playerRef.current.addClass("vjs-theme-fantasy");

      // Event listener to get video duration once metadata is loaded
      playerRef.current.on("loadedmetadata", () => {
        const videoDuration = playerRef.current?.duration();
        if (videoDuration) {
          setDuration(formatTime(videoDuration)); // Set video duration
        }
      });
    }

    // return () => {
    //   if (playerRef.current) {
    //     playerRef.current.dispose();
    //   }
    // };ss
  }, []);

  return (
    <div className="flex relative min-w-[350px] w-auto h-auto mx-auto">
    {/* Overlay displaying current time and duration */}
    <div className="flex flex-row gap-1 absolute bottom-2 left-11 transform -translate-x-1/2 text-white text-[12px] font-medium z-10 bg-black bg-opacity-30 px-2 py-1 rounded-md">
      <Image src="/icons/video-01.svg" width={16} height={16} alt="Video-Player"/>
      <span className="text-white">{duration}</span>
    </div>
    <div className="flex flex-row gap-1 absolute top-[42%] left-1/2 transform -translate-x-1/2 text-white text-[12px] font-medium z-10 bg-transparent ">
    <button>
    <Image src="/icons/play-vid.svg" width={45} height={45} alt="Video-Player"/>
    </button>
    </div>
    <video ref={videoNode} className="video-js vjs-theme-fantasy" 
    // controls
    preload="auto" data-setup="{}">
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
};

export default CommunityVideoPlayer;
