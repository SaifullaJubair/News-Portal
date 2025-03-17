"use client";

import { SettingContext } from "@/provider/SettingProvider";
import { LoaderOverlay } from "@/shared/loader/MiddleLoader";
import { useContext, useEffect } from "react";

const ContactUsPage = () => {
  const { loading, settingData } = useContext(SettingContext);
  const address = settingData?.address;
  console.log(settingData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="py-10 w-full md:w-[1024px] px-4 md:px-0 mx-auto min-h-screen">
      <h2 className="text-xl lg:text-2xl xl:text-3xl text-center tracking-tight font-medium w-full bg-white mb-4 py-3 rounded-xl">
        Contact Us
      </h2>
      <div className="mt-10 bg-white rounded-xl">
        {" "}
        <div
          className=" p-6 "
          dangerouslySetInnerHTML={{
            __html: address,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ContactUsPage;
