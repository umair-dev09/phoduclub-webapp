import { MoonLoader } from "react-spinners";

export default function Loading(){
   
    return(
     <div className="flex justify-center items-center w-[100%] h-[100%]">
<MoonLoader
  color="#7400e0"
  size={50}
  speedMultiplier={1.5}
/>
     </div>   

    );
}