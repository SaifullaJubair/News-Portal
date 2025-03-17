"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded "
      >
        Refresh
      </button>
      <Link
        href="/"
        className="bg-primaryLightColor hover:bg-primaryDeepColor text-white font-semibold py-2 px-4 rounded "
      >
        Return Home
      </Link>
    </div>
  );
}
