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
