import { useEffect, useState } from "react";

interface VideoPlayerProps {
  videoSrc: string;
}

interface VdoCipherResponse {
  otp: string;
  playbackInfo: string;
}

const CourseVideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc }) => {
  const [videoData, setVideoData] = useState<VdoCipherResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const videocipherid = "3f49cd28d53f41e38fb66aec32ad9c1c"; // Video ID

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

      setVideoData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchVideoData(); // Fetch video data when the component mounts
  }, []);

  const iframeSrc = videoData
    ? `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`
    : "";

  // Function to enable the security layer
  const enableSecurityLayer = () => {
    const overlay = document.createElement("div");
    overlay.classList.add("absolute", "top-0", "left-0", "w-full", "h-full", "bg-white", "opacity-0", "z-50");
    document.body.appendChild(overlay);

    // Clean up by removing the overlay when unmounting
    return () => {
      document.body.removeChild(overlay);
    };
  };

  useEffect(() => {
    const removeOverlay = enableSecurityLayer();
    return removeOverlay; // Cleanup on unmount
  }, []);

  return (
    <div className="relative">
      {error && <p className="text-red-500">{error}</p>}
      {uploading && <p>Loading...</p>}
      {!uploading && videoData && (
        <div className="flex justify-center items-center relative">
          <iframe
            src={iframeSrc}
            className="w-full h-full max-w-[800px] max-h-[450px] rounded-lg"
            allow="encrypted-media"
            allowFullScreen
            title="VdoCipher Video Player"
          />
        </div>
      )}
    </div>
  );
};

export default CourseVideoPlayer;
