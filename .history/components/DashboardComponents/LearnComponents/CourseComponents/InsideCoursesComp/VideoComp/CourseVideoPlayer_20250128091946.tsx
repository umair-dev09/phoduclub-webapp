import { useEffect, useRef, useState } from "react";
import videojs from "video.js"; // Import video.js
import "video.js/dist/video-js.css"; // Core Video.js styles
import "@videojs/themes/dist/fantasy/index.css"; // Fantasy theme styles
import Player from "video.js/dist/types/player"; // Import Player type

// interface VideoPlayerProps {
//   videoSrc: string;
// }
interface VdoCipherResponse {
  otp: string;
  playbackInfo: string;
}
interface VideoPlayerProps {
  videoData: VdoCipherResponse | null; // Accept videoData directly
}

const CourseVideoPlayer: React.FC<VideoPlayerProps> = ({ videoData }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null); // Use VideoJsPlayer type from videojs namespace

  const iframeSrc = videoData
    ? `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`
    : '';

  useEffect(() => {
    if (videoNode.current) {
      playerRef.current = videojs(videoNode.current, {
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2], // Define playback speeds
        controlBar: {
          pictureInPictureToggle: false, // Disable PiP button
        },
        responsive: true,
        fluid: true,
        aspectRatio: "16:9", // Set aspect ratio
      });

      // Add Fantasy theme
      playerRef.current.addClass("vjs-theme-fantasy");
    }

    // return () => {
    //   if (playerRef.current) {
    //     playerRef.current.dispose();
    //   }
    // };ss
  }, []);

  return (
    // <div className="flex min-w-[350px] w-[100%] h-[75%] mx-auto justify-center">
    //   <video ref={videoNode} className="video-js vjs-theme-fantasy"
    //     controls
    //     preload="auto"
    //     autoPlay
    //     data-setup="{}">
    //     <source src={videoSrc} type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video>
    // </div>
    <div className="flex min-w-[350px] w-[100%] h-[75%] mx-auto justify-center">
      {iframeSrc ? (
        <iframe
          src={iframeSrc}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="encrypted-media"
          allowFullScreen
          title="VdoCipher Video Player"
        />
      ) : (
        <p>No video data available</p>
      )}
    </div>
  );
};

export default CourseVideoPlayer;




