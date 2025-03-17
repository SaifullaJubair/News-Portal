import Skeleton from "react-loading-skeleton";

const TodayNewsPageSkeleton = () => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto  my-6">
      {/* Top Section Start */}
      <div className="bg-white p-6 border rounded">
        <div className="font-semibold text-pHeadingTextColor flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hover:text-primaryLightColor text-xl duration-100">
              <Skeleton width={150} />
            </div>
            {Array(4)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="hover:text-primaryLightColor duration-100"
                >
                  <Skeleton width={100} />
                </div>
              ))}
          </div>

          <Skeleton width={16} height={16} circle={true} />
        </div>
      </div>
      {/* Top Section end */}

      <div className="bg-white p-4 border rounded ">
        {Array(2)
          .fill()
          ?.map((_, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-2">
                <div className="text-2xl font-semibold flex items-center gap-2 hover:text-pHoverTextColor duration-100">
                  <Skeleton width={150} />
                </div>

                <Skeleton width={16} height={16} circle={true} />
              </div>
              <div>
                <Skeleton height={5} width={"100%"} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 border-r-0  pt-6">
                {Array(10)
                  .fill()
                  .map((_, idx) => (
                    <Skeleton key={idx} height={150} className="rounded-lg" />
                  ))}
              </div>
            </div>
          ))}
        {/* If SubCategory is available sub category wise news End */}
      </div>
    </div>
  );
};

export default TodayNewsPageSkeleton;
