"use client";
import { useContext, useEffect, useState } from "react";
import AccessDenied from "@/components/frontend/Shared/accessDenied/AccessDenied";
import { AuthContext } from "@/context/context";
import BigSpinner from "@/shared/loader/BigSpinner"; // Assuming you have a spinner component

const DashBoardHome = () => {
  const { user, loading } = useContext(AuthContext); // Get loading state and user data from context

  if (loading) {
    // Show a spinner while the user data is still loading
    return <BigSpinner />;
  }

  if (!user) {
    // If no user is found, show access denied (or you can redirect to login)
    return <AccessDenied />;
  }

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
