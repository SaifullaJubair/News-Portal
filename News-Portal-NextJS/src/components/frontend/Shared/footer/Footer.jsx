"use client";
import Link from "next/link";
import {
  facebook,
  instagram,
  linkedin,
  twitter,
  whatsApp,
  youtube,
} from "@/utils/ImageImport";
import { SettingContext } from "@/provider/SettingProvider";
import { useContext } from "react";

const Footer = () => {
  const { loading, settingData } = useContext(SettingContext);
  if (loading) return null;

  return (
    <div className="">
      <div className="border-b border-gray-400 " />
      <div className="h-[2.5px] bg-gray-700 mt-1 "></div>
      <div className="max-w-[1400px] w-[95%] mx-auto  mt-4 print:hidden">
        <div className=" mx-auto mb-2 ">
          <div className="flex flex-col sm:flex-row items-start  justify-between gap-2 md:gap-4 ">
            <div className="md:max-w-md ">
              <Link href="/">
                <img
                  src={settingData?.logo}
                  className="  w-64"
                  alt="News71 Logo"
                />
              </Link>
              {/* <div className="mt-4 lg:max-w-sm font-bold text-gray-700 text-lg">
                <p>সম্পাদক ও প্রকাশক</p>
                <p className="text-gray-600 text-xs font-semibold pt-1">
                  জনাব আলহাজ্ব মুক্তার হোসেন গাজী।
                </p>
                <p className="text-gray-600 text-xs font-semibold pt-1">
                  মুগ্ধ মিডিয়া (এমএম) লিমিটেডের একটি প্রতিষ্ঠান।
                </p>
              </div> */}
            </div>
            <div>
              <ul className=" flex items-start justify-center flex-wrap gap-3 md:gap-5">
                {/* <li>
                  <Link
                    href="/about-us"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    আওয়ার বাংলাদেশ
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/contact-us"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    যোগাযোগ
                  </Link>
                </li>
                <li>
                  <a
                    href="https://epaper.dailyourbangladesh.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    ই-পেপার
                  </a>
                </li>
                {/* <li>
                  <Link
                    href="/today-news"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    আজকের পত্রিকা
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/archive"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    আর্কাইভ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    নীতিমালা
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    গোপনীয়তার নীতি
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-2 text-sm sm:hidden block">
              <p className="font-semibold  text-gray-700">
                {" "}
                ফোন: {settingData?.emergency_contact}
              </p>
              <p className="font-semibold  text-gray-700">
                {" "}
                ইমেইল: {settingData?.email}
              </p>
              <p className="font-semibold  text-gray-700">
                {" "}
                বিজ্ঞাপন: {settingData?.advertisement}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* shompadok */}
      <div className="h-[1.5px] bg-gray-400 print:hidden"></div>
      <div className="max-w-[1400px] w-[95%] mx-auto ">
        <div className=" mx-auto my-1 ">
          <div className="flex items-start  justify-between gap-2 md:gap-4">
            <div className="md:max-w-md ">
              <div className="mt-2 lg:max-w-sm font-bold text-gray-700 text-lg">
                <p>সম্পাদক ও প্রকাশক</p>
                <p className="text-gray-500 sm:text-sm text-xs font-semibold pt-1">
                  জনাব আলহাজ্ব মুক্তার হোসেন গাজী।
                </p>
                <p className="text-gray-500 sm:text-sm text-xs font-semibold pt-1">
                  মুগ্ধ মিডিয়া (এমএম) লিমিটেডের একটি প্রতিষ্ঠান।
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-start justify-between mt-2 flex-wrap gap-3 md:gap-5">
              <div className="">
                <p className="font-semibold  text-gray-700">
                  {" "}
                  ফোন: {settingData?.emergency_contact}
                </p>
                <p className="font-semibold  text-gray-700">
                  {" "}
                  ইমেইল: {settingData?.email}
                </p>
                <p className="font-semibold  text-gray-700">
                  {" "}
                  বিজ্ঞাপন: {settingData?.advertisement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* social  */}
      <div className="h-[1.5px] bg-gray-400 my-2 print:hidden"></div>
      <div className="max-w-[1400px]  mx-auto print:hidden">
        <div className="flex flex-col-reverse gap-y-2 md:gap-0 items-center justify-between  pb-4  md:flex-row">
          <div className="md:w-[57%] ml-2 sm:ml-6 xl:ml-0 ">
            <p className=" text-gray-800 font-bold pb-1">
              © 2024 আওয়ার বাংলাদেশ | ডেভেলপমেন্ট বাই:{" "}
              <span className="text-pLightColor">ক্লাসিক আইটি </span>
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              বার্তা ও বাণিজ্যিক কার্যালয়:লেভেল-৫,বি-২, ইত্তেফাক ভবন, ১
              রামকৃষ্ণ মিশন রোড, ওয়ারী, ঢাকা -১২০৩।
            </p>
          </div>

          <ul className="flex items-center justify-center md:justify-end   space-x-1  sm:mt-0 flex-wrap md:w-[43%] w-full border-b-[1.5px] md:border-transparent pb-2 border-gray-400">
            <li className="flex items-center ">
              <a
                href={`${settingData?.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img className="w-10 sm:w-auto" src={facebook} alt="" />
              </a>
            </li>
            <li className="flex items-center ">
              <a
                href={`${settingData?.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img className="w-10 sm:w-auto" src={instagram} alt="" />
              </a>
            </li>

            <li className="flex items-center ">
              <a
                href={`${settingData?.you_tube}`}
                rel="noreferrer"
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img className="w-10 sm:w-auto" src={youtube} alt="" />
              </a>
            </li>
            <li className="flex items-center ">
              <a
                rel="noreferrer"
                href={`${settingData?.watsapp}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img className="w-10 sm:w-auto" src={whatsApp} alt="" />
              </a>
            </li>
            <li className="flex items-center ">
              <a
                href={`${settingData?.twitter}`}
                rel="noreferrer"
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img className="w-10 sm:w-auto" src={twitter} alt="" />
              </a>
            </li>
            <li className="flex items-center ">
              <a
                href={`${settingData?.linkedin}`}
                rel="noreferrer"
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img className="w-10 sm:w-auto" src={linkedin} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
