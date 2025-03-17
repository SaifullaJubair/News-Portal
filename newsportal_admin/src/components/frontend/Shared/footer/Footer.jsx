import { Link } from "react-router-dom";
import {
  facebook,
  instagram,
  linkedin,
  twitter,
  whatsApp,
  youtube,
} from "../../../../utils/ImageImport";
import { useContext } from "react";
import { SettingContext } from "../../../../context/SettingProvider";

const Footer = () => {
  const { loading, settingData } = useContext(SettingContext);
  // console.log(settingData);
  if (loading) return null;

  return (
    <div className="max-w-[1400px] w-[95%] mx-auto  mt-12 ">
      <div className=" mx-auto ">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <Link href="/">
              <img
                src={settingData?.logo}
                className="  w-64"
                alt="News71 Logo"
              />
            </Link>
            <div className="mt-4 lg:max-w-sm font-bold text-gray-700 text-lg">
              <p>সম্পাদক ও প্রকাশক</p>
              <p className="text-gray-600 text-xs font-semibold pt-1">
                জনাব আলহাজ্ব মুক্তার হোসেন গাজী।
              </p>
              <p className="text-gray-600 text-xs font-semibold pt-1">
                মুগ্ধ মিডিয়া (এমএম) লিমিটেডের একটি প্রতিষ্ঠান।
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="font-semibold tracking-wide text-gray-600"
                >
                  আওয়ার বাংলাদেশ
                </Link>
              </li>
              <li>
                <Link
                  to="/address"
                  className="font-semibold tracking-wide text-gray-600"
                >
                  যোগাযোগ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-semibold tracking-wide text-gray-600"
                >
                  ই-পেপার
                </Link>
              </li>
            </ul>
            <div>
              <ul className="space-y-2">
                {/* <li>
                  <Link
                    to="/ads-details"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    বিজ্ঞাপন
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/today-news"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    আজকের পত্রিকা
                  </Link>
                </li>
                <li>
                  <Link
                    to="/archive"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    আর্কাইভ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    নীতিমালা
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="font-semibold tracking-wide text-gray-600"
                  >
                    গোপনীয়তার নীতি
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 space-y-2 text-sm">
              <p className="font-semibold  text-gray-700">
                {" "}
                মোবাইল: {settingData?.emergency_contact}
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
        <div className="flex flex-col items-center justify-between pt-5 pb-10 border-t md:flex-row">
          <div className="md:w-[57%]">
            <p className=" text-gray-800 font-bold pb-1">
              © 2024 আওয়ার বাংলাদেশ | ডেভেলপমেন্ট বাই:{" "}
              <span className="text-pLightColor">ক্লাসিক আইটি </span>
            </p>
            <p className="text-sm text-gray-600">
              বার্তা ও বাণিজ্যিক কার্যালয়:লেভেল-৫,বি-২, ইত্তেফাক ভবন, ১
              রামকৃষ্ণ মিশন রোড, ওয়ারী, ঢাকা -১২০৩।
            </p>
          </div>
          <ul className="flex items-center justify-end mt-4  space-x-1  sm:mt-0 flex-wrap md:w-[43%]">
            <li className="flex items-center mt-3 sm:mt-0">
              <a
                href={`${settingData?.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img src={facebook} alt="" />
              </a>
            </li>
            <li className="flex items-center mt-3 sm:mt-0">
              <a
                href={`${settingData?.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img src={instagram} alt="" />
              </a>
            </li>

            <li className="flex items-center mt-3 sm:mt-0">
              <a
                href={`${settingData?.you_tube}`}
                rel="noreferrer"
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img src={youtube} alt="" />
              </a>
            </li>
            <li className="flex items-center mt-3 sm:mt-0">
              <a
                rel="noreferrer"
                href={`${settingData?.watsapp}`}
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img src={whatsApp} alt="" />
              </a>
            </li>
            <li className="flex items-center mt-3 sm:mt-0">
              <a
                href={`${settingData?.twitter}`}
                rel="noreferrer"
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img src={twitter} alt="" />
              </a>
            </li>
            <li className="flex items-center mt-3 sm:mt-0">
              <a
                href={`${settingData?.linkedin}`}
                rel="noreferrer"
                target="_blank"
                className="flex flex-col  text-[15px] hover:decoration-primaryColor"
              >
                <img src={linkedin} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
