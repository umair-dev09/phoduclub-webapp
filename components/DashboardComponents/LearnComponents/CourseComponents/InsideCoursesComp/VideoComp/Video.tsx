import { useRef, useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import styles from './video.module.css';
import Image from 'next/image';

function Discussion() {
    const videoRef = useRef(null);  // Reference to the video element
    const [isPlaying, setIsPlaying] = useState(false);  // Track if the video is playing
    const [volume, setVolume] = useState(1);  // Track the volume level (0 to 1)
    const [showVolume, setShowVolume] = useState(false);  // State to toggle volume bar visibility
    const [currentTime, setCurrentTime] = useState(0);  // Track the current time of the video
    const [totalTime, setTotalTime] = useState(0);  // Track the total duration of the video

    // Convert seconds to a time string in the format mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Update total duration when metadata is loaded
            const handleLoadedMetadata = () => setTotalTime(video.duration);

            // Update current time as the video plays
            const handleTimeUpdate = () => setCurrentTime(video.currentTime);

            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            video.addEventListener('timeupdate', handleTimeUpdate);

            // Clean up event listeners when the component unmounts
            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, []);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleRewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;  // Rewind 10 seconds
        }
    };

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;  // Forward 10 seconds
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value); // Ensure proper conversion to float
        if (videoRef.current) {
            videoRef.current.volume = newVolume;  // Update the video volume
        }
        setVolume(newVolume);  // Update the state for volume
    };

    const handleProgressChange = (event) => {
        if (videoRef.current) {
            const seekTime = (event.target.value / 100) * totalTime;
            videoRef.current.currentTime = seekTime;  // Seek video to the selected time
        }
    };

    const toggleVolumeBar = () => {
        setShowVolume(!showVolume);  // Toggle the visibility of the volume bar
    };

    return (
        <div className='flex w-full relative pl-8'>
            <video ref={videoRef} src='/images/demoVideo.mp4' controls={false} className='w-full rounded-xl' onClick={handlePlayPause}></video>  {/* No built-in controls */}
            <div className='flex flex-col justify-end gap-2 absolute h-full left-8 right-0 bottom-0 text-white'>
                <div className='flex flex-1 items-center justify-center'>
                    {isPlaying ? '' : <button onClick={handlePlayPause} className='bg-white p-[17px] rounded-full'><Image src='/icons/bigPlay.svg' alt='play-btn' width={30} height={30} /></button>}
                </div>
                <div className='flex justify-end'>
                    {/* Progress Bar */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={totalTime > 0 ? (currentTime / totalTime) * 100 : 0}
                        onChange={handleProgressChange}
                        className="w-full h-1.5 rounded-none appearance-none"
                        id={styles.progressBar}
                        style={{
                            backgroundImage: `linear-gradient(to right, #7400E0 0%, #7400E0 ${((currentTime / totalTime) * 100 || 0)}%, #FFFFFF ${((currentTime / totalTime) * 100 || 0)}%, #FFFFFF 30%)`
                        }}
                    />
                </div>

                <div className='flex flex-row justify-between px-4 pb-4 pt-2'>
                    <div className='flex flex-row gap-5'>
                        <button onClick={handlePlayPause}>
                            {isPlaying ? <Image src='/icons/pause.svg' alt='pause-btn' width={20} height={20} /> : <Image src='/icons/play.svg' alt='play-btn' width={20} height={20} />}  {/* Update button label based on state */}
                        </button>
                        <button onClick={handleRewind}><Image src='/icons/go-backward-10sec.svg' alt='rewine-btn' width={23} height={23} /></button>  {/* Rewind button */}
                        <button onClick={handleForward}><Image src='/icons/go-forward-10sec.svg' alt='forward-btn' width={23} height={23} /></button>  {/* Forward button */}
                        {/* Volume control with click-to-show and transition effect */}
                        <div className='relative flex items-center gap-2'>
                            <button onClick={toggleVolumeBar}><Image src='/icons/volume-high.svg' alt='volume-btn' width={20} height={20} /></button>  {/* Volume button */}
                            <div
                                className={`transition-all duration-300 overflow-hidden ${showVolume ? '' : 'hidden'}`}
                            >
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-32 flex items-center"  // Tailwind utility class for width
                                />
                            </div>
                        </div>
                        {/* Display current time and total time */}
                        <div className='flex flex-row gap-1'>
                            <div>{formatTime(currentTime)}</div>
                            <div>/</div>
                            <div>{formatTime(totalTime)}</div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-5'>
                        <Popover placement='top-end' className='bg-[#131313] bg-opacity-90 rounded-md'>
                            <PopoverTrigger>
                                <button className='border-none font-bold'>1x</button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col gap-2 py-2 px-3'>
                                    <div className='text-sm font-semibold text-white'>Playback Speed</div>
                                    <div className='flex flex-row gap-1 text-xs font-medium text-white'>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[2.998rem] py-1'>0.5x</button>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[2.998rem] py-1'>1x</button>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[2.998rem] py-1'>1.25x</button>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[2.998rem] py-1'>1.5x</button>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[2.998rem] py-1'>2x</button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Popover placement='top-end' className='bg-[#131313] bg-opacity-90 rounded-md'>
                            <PopoverTrigger><button className='border-none'><Image src='/icons/setting-01.svg' alt='setting-btn' width={20} height={20} /></button></PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col gap-2 py-2 px-3'>
                                    <div className='text-sm font-semibold text-white'>Video Quality</div>
                                    <div className='flex flex-row gap-1 text-xs font-medium text-white'>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[3.792rem] py-1'>480p</button>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[3.792rem] py-1'>720p</button>
                                        <button className='border border-white border-opacity-10 rounded-sm w-[3.792rem] py-1'>1080p</button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        {/* full screen btn */}
                        <div>
                            <button className='flex items-center'><Image src='/icons/arrow-expand-01.svg' alt='rewine-btn' width={20} height={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discussion;
