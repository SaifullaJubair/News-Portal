import Skeleton from "react-loading-skeleton";

const VideoSectionSkeleton = () => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="border border-rounded pb-6">
        {/* top section */}
        <div className="flex items-center justify-between p-4">
          <div className="flex text-lg font-semibold items-center gap-2 hover:text-pHoverTextColor duration-150">
            <Skeleton circle={true} height={40} width={40} />

            <Skeleton width={100} />
          </div>
          <div className="flex font-semibold items-center gap-2 hover:text-pHoverTextColor duration-150">
            <Skeleton circle={true} height={30} width={30} />
          </div>
        </div>

        <div className="mx-4 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div key={index} className="bg-white p-2.5 border rounded">
                  <Skeleton height={180} />
                  <Skeleton height={20} width={`80%`} className="mt-4" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSectionSkeleton;
