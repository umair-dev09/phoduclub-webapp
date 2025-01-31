// app/uploadCipher/page.tsx
"use client";

import React, { useState } from "react";

const UploadCipherPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file to upload.");
      return;
    }

    try {
      // Request upload credentials from the server
      const response = await fetch("/api/vdocipher/upload-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: selectedFile.name }),
      });

      const uploadCreds = await response.json();

      // Prepare form data for the upload
      const formData = new FormData();
      formData.append("x-amz-credential", uploadCreds["x-amz-credential"]);
      formData.append("x-amz-algorithm", uploadCreds["x-amz-algorithm"]);
      formData.append("x-amz-date", uploadCreds["x-amz-date"]);
      formData.append("x-amz-signature", uploadCreds["x-amz-signature"]);
      formData.append("key", uploadCreds["key"]);
      formData.append("policy", uploadCreds["policy"]);
      formData.append("success_action_status", "201");
      formData.append("file", selectedFile);

      // Upload the video to VdoCipher
        const uploadResponse = await fetch(uploadCreds.uploadLink, {
  
        method: "POST",
        body: formData,
      });

      if (uploadResponse.status === 201) {
        console.log("Video uploaded successfully:", uploadCreds.videoId);
        alert(`Video uploaded successfully. Video ID: ${uploadCreds.videoId}`);
      } else {
        console.error("Upload failed:", uploadResponse.statusText);
        alert("Video upload failed.");
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred during the upload.");
    }
  };

  return (
    <div>
      <h1>Upload Video to VdoCipher</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Video
      </button>
    </div>
  );
};

export default UploadCipherPage;
