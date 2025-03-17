"use client";
import Reporter from "@/components/frontend/Reporter/Reporter";
import { AuthContext } from "@/context/context";
import { SettingContext } from "@/provider/SettingProvider";
import { LoaderOverlay } from "@/shared/loader/MiddleLoader";
import { getCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { redirect, usePathname } from "next/navigation";
import { useContext } from "react";

const ReporterPage = () => {
  const { loading, user, logout } = useContext(AuthContext);
  const { loading: settingLoading, settingData } = useContext(SettingContext);

  const isLogged = getCookie(authKey);
  const pathname = usePathname();

  if (settingLoading && loading && !user) {
    return <LoaderOverlay />;
  }

  if (!isLogged) {
    return redirect("/sign-in?success_redirect=" + pathname);
  }

  return (
    <>
      <Reporter user={user} logout={logout} settingData={settingData} />
    </>
  );
};

export default ReporterPage;
