import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const userAgent = req.headers.get('user-agent') || '';

    // Check for mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

    if (isMobile) {
        // Redirect to the correct route
        return NextResponse.redirect('/mobile-not-supported');
    }

    // Allow desktop users to proceed
    return NextResponse.next();
}
