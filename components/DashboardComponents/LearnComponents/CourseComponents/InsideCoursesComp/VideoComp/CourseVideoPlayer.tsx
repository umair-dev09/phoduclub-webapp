import { useEffect, useRef, useState } from "react";
import videojs from "video.js"; // Import video.js
import "video.js/dist/video-js.css"; // Core Video.js styles
import "@videojs/themes/dist/fantasy/index.css"; // Fantasy theme styles
import Player from "video.js/dist/types/player"; // Import Player type

interface VideoPlayerProps {
  videoId: string;
}

interface VdoCipherResponse {
  otp: string;
  playbackInfo: string;
}

const CourseVideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null); // Use VideoJsPlayer type from videojs namespac



  // useEffect(() => {
  //   if (videoNode.current) {
  //     playerRef.current = videojs(videoNode.current, {
  //       controls: true,
  //       playbackRates: [0.5, 1, 1.5, 2], // Define playback speeds
  //       controlBar: {
  //         pictureInPictureToggle: false, // Disable PiP button
  //       },
  //       responsive: true,
  //       fluid: true,
  //       aspectRatio: "16:9", // Set aspect ratio
  //     });

  //     // Add Fantasy theme
  //     playerRef.current.addClass("vjs-theme-fantasy");
  //   }

  //   // return () => {
  //   //   if (playerRef.current) {
  //   //     playerRef.current.dispose();
  //   //   }
  //   // };ss
  // }, []);


  const [videoData, setVideoData] = useState<VdoCipherResponse | null>(null);
  const [error, setError] = useState<string>("");

  // const videocipherid = "3f49cd28d53f41e38fb66aec32ad9c1c"; // Manually set the video ID here




  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch("/api/Videocipher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Allowed-Domains": window.location.hostname // Add current domain
          },
          body: JSON.stringify({ videoId: videoId }),
        });

        if (!response.ok) throw new Error("Domain verification failed");

        const data = await response.json();
        setVideoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification error");
      }
    };

    fetchVideoData();
  }, []);

  const iframeSrc = videoData
    ? `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`
    : "";


  return (


    <div className="relative w-full rounded-md" style={{ paddingBottom: "56.25%" }}>
      {/* <video ref={videoNode} className="video-js vjs-theme-fantasy"
    //     controls
    //     preload="auto"
    //     autoPlay
    //     data-setup="{}">
    //     <source src={videoSrc} type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video> */}
      {error && <div className="text-red-500 p-4">{error}</div>}

      {videoData && (
        <iframe
          src={iframeSrc}
          className="absolute top-0 left-0 w-full h-full "
          allow="encrypted-media; fullscreen"
          allowFullScreen
          title="Secure Video Player"
          sandbox="allow-same-origin allow-scripts"
          referrerPolicy="strict-origin"
          loading="eager"
        />
      )}
    </div>
  );
};

export default CourseVideoPlayer;


