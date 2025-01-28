import { useEffect, useRef, useState } from "react";
import videojs from "video.js"; // Import video.js
import "video.js/dist/video-js.css"; // Core Video.js styles
import "@videojs/themes/dist/fantasy/index.css"; // Fantasy theme styles
import Player from "video.js/dist/types/player"; // Import Player type

interface VideoPlayerProps {
  videoSrc: string;
}

interface VdoCipherResponse {
  otp: string;
  playbackInfo: string;
}

const CourseVideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
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
  const [uploading, setUploading] = useState(false);

  const videocipherid = "3f49cd28d53f41e38fb66aec32ad9c1c"; // Manually set the video ID here



  // useEffect(() => {
  //   const fetchVideoData = async () => {
  //     if (!videocipherid) {
  //       setError("Please provide a video ID");
  //       return;
  //     }

  //     setUploading(true);
  //     setError("");
  //     setVideoData(null);

  //     try {
  //       const response = await fetch("/api/Videocipher", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ videoId: videocipherid }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch video data");
  //       }

  //       const data: VdoCipherResponse = await response.json();

  //       // Log OTP and PlaybackInfo for debugging
  //       console.log("Frontend: OTP:", data.otp);
  //       console.log("Frontend: PlaybackInfo:", data.playbackInfo);

  //       setVideoData(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "An error occurred");
  //     } finally {
  //       setUploading(false);
  //     }
  //   };

  //   fetchVideoData(); // Fetch video data when the component mounts or when videocipherid changes
  // }, []); // Empty dependency array ensures it runs only once after initial mount
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch("/api/Videocipher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Allowed-Domains": window.location.hostname // Add current domain
          },
          body: JSON.stringify({ videoId: videocipherid }),
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
    // <div className="flex w-25 h-25 justify-center">
    //   {/* <video ref={videoNode} className="video-js vjs-theme-fantasy"
    //     controls
    //     preload="auto"
    //     autoPlay
    //     data-setup="{}">
    //     <source src={videoSrc} type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video> */}

    //   {error && <p className="text-red-500">{error}</p>}
    //   {uploading && <p>Loading...</p>}
    //   {!uploading && videoData && (
    //     <div className="w-25 h-25 items-center justify-center flex">
    //       <iframe
    //         src={iframeSrc}
    //         className=" w-25 h-25 rounded-lg"
    //         allow="encrypted-media"
    //         allowFullScreen
    //         title="VdoCipher Video Player"
    //       />
    //     </div>
    //   )}

    // </div>
    <div className="flex min-w-[350px] w-[100%] h-[75%] mx-auto justify-center">
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
        <iframe
          src={iframeSrc}
          className="w-full h-[450px] rounded-md"
          allowFullScreen
          allow="encrypted-media"
        ></iframe>
      )}



    </div>
  );
};

export default CourseVideoPlayer;


