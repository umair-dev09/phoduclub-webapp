import { useEffect, useState, useRef } from 'react';

// Function to convert time string "HH:MM" to total seconds
const convertTimeToSeconds = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60);
};

// Function to format seconds to "HH:MM:SS"
const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

interface TimerProps {
    initialTime: string;  // Format: "HH:MM"
    onTimeEnd: () => void;
    onTimeUpdate: (timeLeftInSeconds: number) => void; // Callback for time updates
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
                onTimeUpdate(prevTime - 1); // Update parent with the current time in seconds
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup
        return () => clearInterval(intervalRef.current!);
    }, [onTimeEnd, onTimeUpdate]);

    return (
        <p className=" font-semibold text-lg">
            Time Left: {formatTime(timeLeft)}
        </p>
    );
};

export default Timer;