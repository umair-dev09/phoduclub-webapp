import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const userAgent = req.headers.get("user-agent") || "";

    // Check for common mobile user agents
    const isMobile = /Mobile|Android|iP(ad|hone|od)|IEMobile|BlackBerry/i.test(
        userAgent
    );

    if (isMobile) {
        return new NextResponse(
            "<h1>Access Blocked on Mobile Devices</h1><p>Please use a desktop browser.</p>",
            {
                status: 403,
                headers: {
                    "Content-Type": "text/html",
                },
            }
        );
    }

    // Allow access if not a mobile device
    return NextResponse.next();
}
