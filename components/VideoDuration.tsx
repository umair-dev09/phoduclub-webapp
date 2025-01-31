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
          const hours = Math.floor(data.duration / 3600);
          const minutes = Math.floor((data.duration % 3600) / 60);
          const seconds = data.duration % 60;

          const formattedTime =
            hours > 0
              ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
              : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

          setFormattedDuration(formattedTime);
        } else {
          console.error("Error fetching duration:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch duration:", err);
      }
    };

    fetchDuration();
  }, [videoId]);

  return <span>{formattedDuration}</span>;
};

export default VideoDuration;
