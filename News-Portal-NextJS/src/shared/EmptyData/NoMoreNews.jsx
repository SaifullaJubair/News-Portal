import { FaRegNewspaper } from "react-icons/fa";

export const NoMoreNewsMessage = () => {
  return (
    <div className="bg-[#fbf9f9] pt-6 tracking-wide min-h-[80vh] flex items-center justify-center">
      <div className="text-center -mt-40">
        <FaRegNewspaper size={60} className="text-gray-500 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          No News Available
        </h1>
        {/* <p className="text-lg text-gray-500">
          You've reached the end of the news. Check back later for more updates!
        </p> */}
      </div>
    </div>
  );
};
