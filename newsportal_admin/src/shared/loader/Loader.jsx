import "./Loader.css";
import { PuffLoader } from "react-spinners";

export default function Loader({ lable }) {
  return (
    <>
      <div className="bg-primaryDeepColor  h-[100vh] flex gap-3 flex-col justify-center items-center">
        <PuffLoader
          color="#05ffe1"
          cssOverride={{}}
          loading
          size={99}
          speedMultiplier={1}
        />
        <div className="text-transparent text-4xl  text-rose-500 font-bold py-2 px-4 rounded ">
          {lable}
        </div>
      </div>
    </>
  );
}
