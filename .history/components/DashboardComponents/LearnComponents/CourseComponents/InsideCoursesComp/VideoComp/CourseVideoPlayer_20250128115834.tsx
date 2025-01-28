import { useEffect, useRef, useState } from "react";
import videojs from "video.js"; // Import video.js
import "video.js/dist/video-js.css"; // Core Video.js styles
import "@videojs/themes/dist/fantasy/index.css"; // Fantasy theme styles
import Player from "video.js/dist/types/player"; // Import Player type

interface VideoPlayerProps {
  videoSrc: string;
}

const CourseVideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null); // Use VideoJsPlayer type from videojs namespace
  const videoData = {
    videoId: "213d5314736648f9967bc11f7888b775"
  };

  const iframeSrc = `https://player.vdocipher.com/v2/?otp=20160313versASE323LtZIl8VolXl74O8MC981CKx4RrRIzmcXII23pAwN7UYl3d&playbackInfo=${encodeURIComponent(
    JSON.stringify({ videoId: videoData.videoId })
  )}`;

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
    <div className="flex min-w-[350px] w-[100%] h-[75%] mx-auto justify-center">
      {/* <video ref={videoNode} className="video-js vjs-theme-fantasy"
        controls
        preload="auto"
        autoPlay
        data-setup="{}">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <iframe
        src="https://player.vdocipher.com/v2/?otp=20160313versASE323jBuN9YtXe8aypauY4WSvdvjMcE3aksxsG8pvUqupIB0cdZ&playbackInfo=eyJ2aWRlb0lkIjoiMjEzZDUzMTQ3MzY2NDhmOTk2N2JjMTFmNzg4OGI3NzUifQ=="
        style={{ border: 0, height: "360px", width: "640px", maxWidth: "100%" }}
        allowFullScreen
        allow="encrypted-media"
      ></iframe>

    </div>
  );
};

export default CourseVideoPlayer;


