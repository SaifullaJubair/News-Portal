import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SubCategoryNewsSkeleton = () => {
  return (
    <div className="bg-[#fbf9f9] pt-6 tracking-wide min-h-screen">
      <div className="max-w-[1400px] w-[95%] mx-auto">
        {/* Top Section Skeleton */}
        <div className="bg-white p-6 border rounded">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Skeleton height={24} width={96} />
              <Skeleton height={24} width={64} />
              <Skeleton height={24} width={64} />
              <Skeleton height={24} width={64} />
              <Skeleton height={24} width={64} />
            </div>
            <Skeleton circle height={24} width={24} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 pt-4 gap-4">
            <div className="col-span-1 sm:col-span-2">
              <Skeleton height={"100%"} className="rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={180} className="rounded" />
              ))}
            </div>
          </div>
        </div>
        {/* Top Section Skeleton End */}

        {/* Subcategory List Skeleton */}
        {/* <div className="pb-10">
          <div className="p-4 rounded my-6 max-w-6xl mx-auto">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="cursor-pointer px-2 space-y-1.5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 my-6 gap-4"
              >
                <div className="col-span-1">
                  <Skeleton height={160} className="rounded" />
                </div>
                <div className="col-span-1 sm:col-span-2 md:grid-cols-3">
                  <Skeleton height={24} width="75%" className="rounded mb-2" />
                  <Skeleton height={16} width="100%" className="rounded mb-2" />
                  <Skeleton height={16} width="83%" className="rounded" />
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SubCategoryNewsSkeleton;
