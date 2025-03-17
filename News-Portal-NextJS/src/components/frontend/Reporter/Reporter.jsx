import { user1 } from "@/utils/ImageImport";

const Reporter = ({ user, logout, settingData }) => {
  console.log(user);
  return (
    <div className="max-w-4xl mx-auto w-[95%] ">
      <div className=" shadow-md rounded-md  border my-2 sm:m-4">
        <img
          src={settingData?.cover_photo}
          className="w-full sm:h-60 h-40 rounded-t-md"
          alt=""
        />

        <div className="flex justify-center -mt-24 sm:-mt-32">
          {user?.user_image ? (
            <div className="  ">
              <img
                src={user?.user_image}
                className=" sm:h-52  sm:w-52 ring-4 ring-white w-40 h-40 rounded-full "
                alt=""
                srcset=""
              />
            </div>
          ) : (
            <div className="sm:h-52  sm:w-52 ring-4 ring-white w-40 h-40 rounded-full ">
              <img src={user1} className="w-full" alt="" srcset="" />
            </div>
          )}
        </div>
        <p className="text-xl font-semibold pt-2 sm:text-2xl md:text-3xl text-center text-gray-700">
          {user?.user_name}
        </p>

        <p className="text-base sm:text-lg text-center text-pTextColor">
          {user?.user_designation}
        </p>
        <div className="flex flex-col space-y-2 my-4 px-2">
          <p className="text-base sm:text-lg text-pTextColor text-center rounded bg-slate-100 border shadow-sm py-1.5">
            Joining: {user?.joining_date}
          </p>

          <p className="text-base sm:text-lg pt-2 font-medium text-gray-900">
            Responsibility
          </p>
          <p
            className="bg-slate-100 border shadow-sm py-1.5 rounded text-base sm:text-lg text-pTextColor px-2"
            dangerouslySetInnerHTML={{
              __html: user?.user_description,
            }}
          ></p>
          <p className="text-base sm:text-lg pt-2 font-medium text-gray-900">
            Contact
          </p>
          <div className="bg-slate-100 border shadow-sm py-1.5 space-y-1.5 rounded text-base sm:text-lg text-pTextColor px-2">
            <p className="text-base sm:text-lg text-pTextColor">
              Number: {user?.user_phone}
            </p>
            <p className="text-base sm:text-lg text-pTextColor">
              Reference Number: {user?.reference_number}
            </p>
            <p className="text-base sm:text-lg text-pTextColor">
              E-mail: {user?.user_email}
            </p>
            <p className="text-base sm:text-lg text-pTextColor">
              UserID: {user?.user_id}
            </p>
          </div>
          <p className="text-base sm:text-lg pt-2 font-medium text-gray-900">
            Address
          </p>
          <div className="bg-slate-100 border shadow-sm py-1.5 space-y-1.5 rounded text-base sm:text-lg text-pTextColor px-2">
            {user?.division && (
              <p className="text-base sm:text-lg text-pTextColor">
                Division: {user?.division}
              </p>
            )}
            {user?.district && (
              <p className="text-base sm:text-lg text-pTextColor">
                District: {user?.district}
              </p>
            )}
            {user?.user_address && (
              <p className="text-base sm:text-lg text-pTextColor">
                Address: {user?.user_address}
              </p>
            )}
          </div>
        </div>
        <div className="sm:w-7/12 mx-auto px-2 my-4 w-full  ">
          <button
            className="mt-4   w-full border-gray-200 border px-4 py-2  text-center duration-300 hover:bg-red-500 hover:text-white rounded-md"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reporter;
