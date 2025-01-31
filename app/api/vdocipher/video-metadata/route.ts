import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "Missing videoId" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}`, {
      method: "GET",
      headers: {
        Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch video data", details: data }, { status: response.status });
    }

    // Extracting 'length' instead of 'duration'
    const duration = data.length ?? "No duration found";

    return NextResponse.json({ duration }, { status: 200 });

  } catch (error) {
    console.error("VdoCipher API Fetch Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
