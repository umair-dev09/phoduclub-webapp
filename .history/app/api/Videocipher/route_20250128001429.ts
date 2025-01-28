import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { videoId } = await request.json();
    const apiSecret = process.env.VDOCIPHER_API_SECRET;

    if (!videoId) {
        return NextResponse.json(
            { error: 'Video ID is required' },
            { status: 400 }
        );
    }

    try {
        const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
            method: 'POST',
            headers: {
                'Authorization': `Apisecret ${apiSecret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ttl: 300 }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch video data');
        }

        const data = await response.json();

        // Log otp and playbackInfo to console
        console.log('Backend: OTP:', data.otp);
        console.log('Backend: PlaybackInfo:', data.playbackInfo);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Backend: Error fetching video data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch video data' },
            { status: 500 }
        );
    }
}
'use client';

import { useState } from 'react';

interface VdoCipherResponse {
    otp: string;
    playbackInfo: string;
}

const VideoPlayer = () => {
    const [videoId, setVideoId] = useState('');
    const [videoData, setVideoData] = useState<VdoCipherResponse | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const fetchVideoData = async () => {
        if (!videocipherId) {
            setError('Please enter a video ID');
            return;
        }

        setLoad(true);
        setError('');
        setVideoData(null);

        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch video data');
            }

            const data: VdoCipherResponse = await response.json();

            // Log otp and playbackInfo to console
            console.log('Frontend: OTP:', data.otp);
            console.log('Frontend: PlaybackInfo:', data.playbackInfo);

            setVideoData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoad(false);
        }
    };

    const iframeSrc = videoData
        ? `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`
        : '';

    return (
        <div className= "max-w-4xl mx-auto p-4" >
        <h1 className="text-xl font-bold mb-4" > VdoCipher Video Player </h1>

            < div className = "flex items-center mb-4" >
                <input
          type="text"
    value = { videoId }
    onChange = {(e) => setVideocipherId(e.target.value)}
placeholder = "Enter Video ID"
className = "border rounded-lg p-2 flex-1 mr-4"
    />
    <button
          onClick={ fetchVideoData }
className = "bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
    >
    Load Video
        </button>
        </div>

{ load && <div className="text-center" > Loading video...</div> }

{ error && <div className="text-red-500 mb-4" > { error } </div> }

{
    videoData && (
        <div className="relative w-full" style = {{ paddingBottom: '56.25%' }
}>
    <iframe
            src={ iframeSrc }
className = "absolute top-0 left-0 w-full h-full rounded-lg"
allow = "encrypted-media"
allowFullScreen
title = "VdoCipher Video Player"
    />
    </div>
      )}
</div>
  );
};

export default VideoPlayer;

