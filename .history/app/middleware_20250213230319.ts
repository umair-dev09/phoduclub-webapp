import { NextResponse } from 'next/server';

export function middleware(req: NextResponse) {
    const userAgent = req.headers.get('user-agent') || '';

    // Simple check for mobile devices (you can adjust this)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

    if (isMobile) {
        // Redirect to a "not available" page
        return NextResponse.redirect('/moblienot');
    }

    // Allow desktop users to proceed
    return NextResponse.next();
}
