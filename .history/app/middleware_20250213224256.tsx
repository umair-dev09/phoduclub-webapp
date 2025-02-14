import { NextResponse } from "next/server";

export function middleware(req: { headers: { get: (arg0: string) => string; }; }) {
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

    return NextResponse.next();
}
