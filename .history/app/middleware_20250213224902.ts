import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const userAgent = req.headers.get('user-agent') || '';

    // Simple check for mobile devices
    const isMobile = /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Opera Mini/i.test(userAgent);

    if (isMobile) {
        return new NextResponse('This website is not available on mobile.', { status: 403 });
    }

    // Continue for non-mobile devices
    return NextResponse.next();
}
