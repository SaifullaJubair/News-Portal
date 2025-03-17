const AdSection = ({ adsData }) => {
  return (
    <div className="max-w-[1400px] w-[95%] mx-auto">
      <div className="max-w-[1100px]  mx-auto w-[95%] ">
        <img
          src={adsData?.ads_image}
          alt="banner"
          className="lg:w-[970px] md:h-[250px] h-[150px] w-full  "
        />
      </div>
    </div>
  );
};

export default AdSection;
