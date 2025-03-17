import Skeleton from "react-loading-skeleton";

const HorizontalNewsSkeleton = () => {
  return (
    <div className="">
      <div className="">
        {/* Skeleton for the Image */}
        <div className="col-span-1">
          <Skeleton height={160} width="100%" />
        </div>
        {/* Skeleton for the Text */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3">
          <Skeleton height={20} width="75%" style={{ marginTop: "8px" }} />
          <Skeleton height={10} width="100%" style={{ marginTop: "16px" }} />
          <Skeleton height={10} width="85%" style={{ marginTop: "8px" }} />
          <Skeleton height={10} width="85%" style={{ marginTop: "8px" }} />
          <Skeleton height={10} width="85%" style={{ marginTop: "8px" }} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalNewsSkeleton;
