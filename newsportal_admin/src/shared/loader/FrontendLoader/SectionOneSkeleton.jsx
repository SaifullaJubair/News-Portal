import Skeleton from "react-loading-skeleton";
const SectionOneSkeleton = () => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100">
          <Skeleton circle={true} height={40} width={40} />

          <p>
            <Skeleton width={120} />
          </p>
        </div>

        <Skeleton circle={true} height={30} width={30} />
      </div>

      <Skeleton width={"100%"} height={8} />

      {/* News */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6 tracking-wide">
        <div className="cursor-pointer hover:opacity-90 px-2 border-r-0 sm:border-r group">
          <Skeleton height={180} className="rounded-lg md:h-44 w-full" />

          <div className="py-2">
            <p className="font-semibold pb-2 text-pHeadingTextColor text-[16px] group-hover:text-pHoverTextColor duration-150">
              <Skeleton width="80%" />
            </p>

            <Skeleton count={3} height={10} />
          </div>
        </div>

        {/* 2nd section */}
        <div className="flex flex-col gap-3 px-2 border-r-0 sm:border-r h-full">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div
                className="flex h-[25%] border-b pb-2 items-center gap-1.5 cursor-pointer group"
                key={index}
              >
                {/* Skeleton for the image */}
                <div className="w-[30%]">
                  <Skeleton width="100%" height={50} className="rounded-lg" />
                </div>
                <div className="w-[68%]">
                  {/* Skeleton for the text */}
                  <Skeleton width="100%" height={20} />
                </div>
              </div>
            ))}
        </div>

        {/* 3rd section */}
        <div className="flex flex-col md:gap-1 mt-2 gap-6 border-r-0 sm:border-r">
          {Array(5)
            .fill("")
            .map((_, index) => (
              <div
                className="flex items-center gap-2"
                key={index}
                style={{ flexGrow: 1 }}
              >
                <Skeleton width={20} height={20} className="mr-2" />
                <div className="flex-grow">
                  <Skeleton width="90%" height="100%" />
                </div>
              </div>
            ))}
        </div>

        {/* 4th section for ad */}
        <div className="hidden lg:block">
          <Skeleton height={300} />
        </div>
      </div>
    </div>
  );
};

export default SectionOneSkeleton;
