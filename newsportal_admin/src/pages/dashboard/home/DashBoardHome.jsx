import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AccessDenied from "../../../components/frontend/Shared/accessDenied/AccessDenied";

const DashBoardHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {user?.role_id?.dashboard_show ? (
        <>
          <h1 className="text-3xl font-bold underline"> DashBoard home Page</h1>
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default DashBoardHome;
