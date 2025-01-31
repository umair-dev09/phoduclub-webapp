"use client";
import { useEffect, useState } from "react";

interface VideoDurationProps {
  videoId: string;
}

const VideoDuration: React.FC<VideoDurationProps> = ({ videoId }) => {
  const [formattedDuration, setFormattedDuration] = useState<string>("00:00");

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const response = await fetch(`/api/vdocipher/video-metadata?videoId=${videoId}`);
        const data = await response.json();

        if (response.ok && data.duration) {
          const minutes = Math.floor(data.duration / 60);
          const seconds = data.duration % 60;
          setFormattedDuration(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
        } else {
          console.error("Error fetching duration:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch duration:", err);
      }
    };

    fetchDuration();
  }, [videoId]);

  return <span className="">{formattedDuration}</span>;
};

export default VideoDuration;
