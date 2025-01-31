import { NextResponse } from "next/server";
import axios from "axios";

const VDOCIPHER_API_SECRET = process.env.VDOCIPHER_API_SECRET;

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const response = await axios.post(
      "https://dev.vdocipher.com/api/videos",
      { title },
      {
        headers: {
          Authorization: `Apisecret ${VDOCIPHER_API_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    const uploadCreds = response.data.clientPayload;
    uploadCreds.videoId = response.data.videoId; // Include videoId in the response

    return NextResponse.json(uploadCreds);
  } catch (error) {
    console.error("Error fetching upload credentials:", error);
    return NextResponse.json({ error: "Failed to fetch upload credentials" }, { status: 500 });
  }
}
