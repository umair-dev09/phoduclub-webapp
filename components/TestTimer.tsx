import { useEffect, useState, useRef } from 'react';

// Function to convert time string to total seconds
const convertTimeToSeconds = (timeString: string): number => {
    const [value, unit] = timeString.split(' ');
    const numericValue = parseFloat(value);
    
    if (unit.startsWith('Hour')) {
        return Math.floor(numericValue * 3600); // Convert hours to seconds
    } else if (unit.startsWith('Minute')) {
        return Math.floor(numericValue * 60); // Convert minutes to seconds
    }
    return 0;
};

// Function to format seconds to MM:SS
const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(3, '0')}:${seconds.toString().padStart(2, '0')}`;
};

interface TimerProps {
    initialTime: string;
    onTimeEnd: () => void;
    onTimeUpdate: (timeLeftInMinutes: number) => void; // New callback for time updates
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeEnd, onTimeUpdate }) => {
    const [timeLeft, setTimeLeft] = useState<number>(convertTimeToSeconds(initialTime));
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Start timer
        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalRef.current!);
                    onTimeEnd(); // Trigger handleSubmit when timer ends
                    return 0;
                }
                const timeLeftInMinutes = (prevTime - 1) / 60;
                onTimeUpdate(timeLeftInMinutes); // Update parent with the current time in minutes
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup
        return () => clearInterval(intervalRef.current!);
    }, [onTimeEnd, onTimeUpdate]);

    return (
        <p className="font-[Inter] font-semibold text-[12px]">
            Time Left: {formatTime(timeLeft)}
        </p>
    );
};

export default Timer;