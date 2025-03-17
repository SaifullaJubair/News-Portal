const TopSectionSkeleton = () => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="grid lg:grid-cols-4 gap-6 md:gird-cols-3 grid-cols-2 my-4">
        {/* Feature news */}

        <div className="col-span-2">
          <div className="ml-1">
            <div className="  group ">
              <h1 className="md:text-2xl text-xl animate-pulse bg-gray-300 my-2 md:max-w-lg  w-28">
                {/* Heading */}
              </h1>
              <div className="relative">
                <div className="w-full h-[310px] rounded animate-pulse" />
                <div className="absolute inset-0  bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 my-2">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  className="col-span-1 cursor-pointer group relative"
                  key={index}
                >
                  <div className="w-full h-48 animate-pulse" />
                  <div className="absolute inset-0 bg-black/50 opacity-25 group-hover:opacity-100 transition-opacity rounded duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full p-2">
                    <p className="text-xs flex gap-2 items-center text-white my-1 animate-pulse bg-gray-300"></p>
                    <h1
                      className="font-bold m-2 md:max-w-lg w-full mb-3 mt-1 bg-gray-300 animate-pulse"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    ></h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionSkeleton;
