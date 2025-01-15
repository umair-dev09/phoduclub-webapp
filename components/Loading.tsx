import { MoonLoader } from "react-spinners";
import styles from "./loading.module.css"
export default function LoadingData() {

  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <MoonLoader
        color="#7400e0"
        size={50}
        speedMultiplier={1.5}
      />
    </div>
  );
}