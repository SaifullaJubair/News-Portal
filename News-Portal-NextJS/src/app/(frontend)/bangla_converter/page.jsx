"use client";

import { useState } from "react";
import {
  ConvertToUnicode,
  ConvertToASCII,
} from "bijoy-to-unicode-bengali-conversion";

const BanglaConverter = () => {
  const [bijoy, setBijoy] = useState("");
  const [unicode, setUnicode] = useState("");

  const setUnicodeTextInBengali = (e) => {
    const data = e.target.value;
    setUnicode(data);
    // const convertedUnicode = ConvertToUnicode("bijoy", data);
    // setUnicode(convertedUnicode);
  };

  const handleUnicodeToBijoy = () => {
    // Convert the Bengali Unicode text back to Bijoy-encoded ASCII
    const convertedBijoy = ConvertToASCII("bijoy", unicode);
    // Convert back to Unicode for display
    const displayUnicode = ConvertToUnicode("bijoy", convertedBijoy);
    setBijoy(displayUnicode);
  };

  const setBijoyTextInBengali = (e) => {
    const data = e.target.value;
    setBijoy(data);
    // Convert Bijoy ASCII input to Unicode for real-time Bengali display
    // const convertedUnicode = ConvertToUnicode("bijoy", data);
    // setBijoy(convertedUnicode);
  };

  const handleBijoyToUnicode = () => {
    // Convert the Bijoy-encoded ASCII text to Bengali Unicode
    const convertedUnicode = ConvertToUnicode("bijoy", bijoy);
    setUnicode(convertedUnicode);
  };

  return (
    <div className="tracking-wide">
      <div className="max-w-[1400px] w-[95%] mx-auto bg-[#fbf9f9]  p-8">
        <div className="mt-8">
          <label htmlFor="unicode" className="block font-bold">
            ইউনিকোড কি-বোর্ডের লেখা এখানে পেস্ট করুন:{" "}
          </label>
          <textarea
            type="text"                                                                                                                                                                                 
            name="unicode"
            id="unicode"
            value={unicode}
            onChange={setUnicodeTextInBengali}
            rows={8}
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
          />
        </div>
        <div className="mt-8 flex items-center justify-center gap-6 flex-wrap">
          <button
            type="button"
            className="bg-primaryLightColor text-white px-4 py-2 font-semibold"
            onClick={handleUnicodeToBijoy}
          >
            {" "}
            ইউনিকোড টু বিজয়{" "}
          </button>
          <button
            type="button"
            className="bg-irisBlueColor text-white px-4 py-2 font-semibold"
            onClick={handleBijoyToUnicode}
          >
            {" "}
            বিজয় টু ইউনিকোড{" "}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 font-semibold"
            onClick={() => {
              setBijoy("");
              setUnicode("");
            }}
          >
            {" "}
            মুছে ফেলুন{" "}
          </button>
        </div>
        <div className="mt-8">
          <label htmlFor="bijoy" className="block font-bold">
            বিজয় কি-বোর্ডের লেখা এখানে পেস্ট করুন:
          </label>
          <textarea
            type="text"
            name="bijoy"
            id="bijoy"
            value={bijoy}
            rows={8}
            onChange={setBijoyTextInBengali}
            className="border border-gray-300 rounded-md p-2 w-full h-56 mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BanglaConverter;
