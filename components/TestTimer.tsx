import { useEffect, useState } from 'react';

interface TimerProps {
  timeLeft: number;  // Time left in seconds
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, className }) => {
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <p className={className || "font-[Inter] font-semibold text-[12px]"}>
      Time Left: {formatTime(timeLeft)}
    </p>
  );
};

export default Timer;