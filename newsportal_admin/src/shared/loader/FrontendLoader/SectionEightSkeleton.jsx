import Skeleton from "react-loading-skeleton";

const SectionEightSkeleton = () => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div>
        {/* Header Skeleton */}
        <div className="flex items-center justify-between  ">
          <div className="flex items-center gap-2">
            <Skeleton width={40} height={32} />
            <Skeleton width={150} height={24} />
          </div>
          <Skeleton width={24} height={24} />
        </div>
        <Skeleton width={"100%"} height={5} />

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-6 tracking-wide">
          {/* 1st Column Skeleton */}
          <div className="flex flex-col gap-1 px-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div className="mt-2 space-y-3" key={index}>
                  <Skeleton width="100%" height={30} />
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="75%" height={10} />
                  <hr className="m-1" />
                </div>
              ))}
          </div>

          {/* 2nd Column Skeleton */}
          <div className="col-span-1 md:col-span-2 px-2">
            <div>
              <Skeleton height={320} />
              <div className="p-3 space-y-3">
                <Skeleton width="100%" height={25} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
                <Skeleton width="100%" height={10} />
              </div>
            </div>
          </div>

          {/* 3rd Column Skeleton */}
          <div className="flex flex-col gap-1 px-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div className="mt-2 space-y-2" key={index}>
                  <div className="pb-1.5">
                    <Skeleton width="100%" height={20} />
                  </div>
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="100%" height={10} />
                  <Skeleton width="100%" height={10} />
                  <hr className="m-1" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionEightSkeleton;
