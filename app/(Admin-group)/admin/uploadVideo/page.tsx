import MuxUploader from "@/components/MuxUploader";
import Mux from "@mux/mux-node";
import { redirect } from "next/navigation";

// reads MUX_TOKEN_ID and MUX_TOKEN_SECRET from your environment
const mux = new Mux();

// Create a new upload
const createUpload = async () => {
  const upload = await mux.video.uploads.create({
    new_asset_settings: {
      playback_policy: ["public"],
      encoding_tier: "baseline",
    },
    cors_origin: "*", // Update this to your production domain
  });

  return upload;
};

// Poll for the asset status with a delay of 3 seconds between attempts
const waitForThreeSeconds = () =>
  new Promise((resolve) => setTimeout(resolve, 3000));

// Check asset status by assetId
const checkAssetStatus = async (assetId: string) => {
  const asset = await mux.video.assets.retrieve(assetId);

  // If asset is ready and has a public playback ID, return it
  if (asset.status === "ready") {
    const playbackIds = asset.playback_ids;
    if (Array.isArray(playbackIds)) {
      const playbackId = playbackIds.find((id) => id.policy === "public");
      if (playbackId) {
        console.log("Playback ID:", playbackId.id);
        return playbackId.id;
      }
    }
  }

  return {
    status: asset.status,
    errors: asset.errors,
  };
};

// Poll for the assetId and redirect if the asset is ready
const redirectToAsset = async (uploadId: string) => {
  let attempts = 0;
  while (attempts <= 10) {
    const upload = await mux.video.uploads.retrieve(uploadId);
    if (upload.asset_id) {
      // Log the asset_id to the console
      console.log("Asset ID:", upload.asset_id);

      // Poll for the asset's playback ID
      const playbackId = await pollAssetPlayback(upload.asset_id);
      if (playbackId) {
        redirect(`/admin/${playbackId}/?pId=${playbackId}`);
      }
    } else {
      await waitForThreeSeconds();
      attempts++;
    }
  }
  throw new Error("No asset_id found for upload");
};

// Polling function to get the playbackId using the assetId
const pollAssetPlayback = async (assetId: string) => {
  let attempts = 0;
  while (attempts <= 10) {
    const status = await checkAssetStatus(assetId);
    if (typeof status === "string") {
      return status; // This is the playbackId
    }
    await waitForThreeSeconds();
    attempts++;
  }
  throw new Error("Playback ID not found for asset");
};

// Disable caching for the page
export const dynamic = "force-dynamic";

export default async function Page() {
  // Create a new upload
  const upload = await createUpload();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <p className="text-center w-[60%]">Upload the lesson video below and then wait until you see the copy video id button.</p>
    <div className="w-[50%] self-center align-middle">
    <MuxUploader 
      onSuccess={async () => {
        "use server";
        // Get the playbackId by polling for the asset's status
      await redirectToAsset(upload.id);
    //     if (playbackId) {
    //       console.log("Final Playback ID:", playbackId); // Log the playbackId once ready
    //  }
      }}
      endpoint={upload.url}
    />
   </div>
   </div>
   
  );
}
