import { permission } from "../../../../utils/ImageImport";

const AccessDenied = () => {
  return (
    <div className="h-[80vh] grid place-items-center">
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center  ">
        <img src={permission} className="w-full" alt="" />
      </div>
    </div>
  );
};

export default AccessDenied;
