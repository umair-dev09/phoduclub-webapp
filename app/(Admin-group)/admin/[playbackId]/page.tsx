"use client";
import Video from "next-video";
import { useRouter, useSearchParams } from "next/navigation";

function Playback(){
const router = useRouter();
      const searchParams = useSearchParams();
      const pId = searchParams.get('pId'); 
      const handleCloseTab = () => {
        navigator.clipboard.writeText(pId || '');
        alert('Video Id is copied you can close this tab now.');
      }; 
    return(
        <div className="flex flex-col w-full h-full items-center justify-center gap-4">
            <p>Video Id: {pId}</p>
            <div className="w-[60%]">
            <Video playbackId={pId || ''}/>
            </div>
            <button
             className="text-white text-sm font-semibold py-3 px-6 rounded-md shadow-inner-button"
             style={{
               width: "182px",
               height: "44px",
               backgroundColor: "#9012FF",
               borderWidth: "1px 0 0 0",
               borderColor: "#9012FF",
             }} onClick={handleCloseTab}>Copy Video Id</button>
        </div>
    );
}
export default Playback;