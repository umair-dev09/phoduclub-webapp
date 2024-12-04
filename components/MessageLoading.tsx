import { MoonLoader } from "react-spinners";
import styles from "./loading.module.css"
export default function MessageLoading(){
   
    return(
        <div className="flex w-full items-center justify-center">      
            <MoonLoader 
          color="#7400e0"
          size={25}
          speedMultiplier={1.5}
          />
            </div>
    );
}