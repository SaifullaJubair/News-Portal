export const SocialMediaSkeleton = () => {
  return (
    <div className="animate-pulse max-w-[1400px] mx-auto w-[95%]">
      <div className="flex items-center my-4 gap-2 text-sm">
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
      </div>
      <hr />
      <div className="my-10">
        <div className="h-8 w-40 bg-gray-300 mb-4 rounded"></div>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="media-section mb-8">
            <div className="flex items-center mb-2">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="media-links flex flex-wrap gap-10">
              {[1, 2].map((_, idx) => (
                <div className="flex gap-2 items-center group mb-2" key={idx}>
                  <div className="h-8 w-8 bg-gray-300 rounded"></div>
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};
