"use client";
import { AuthContext } from "@/context/context";
import { BASE_URL } from "@/utils/baseURL";
import { eraseCookie, getCookie, setCookie } from "@/utils/cookie-storage";
import { authKey } from "@/utils/storageKey";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = getCookie(authKey);
  useEffect(() => {
    setLoading(true);
    if (token) {
      fetch(`${BASE_URL}/getMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data?.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    } else setLoading(false);
  }, [token]);

  const handleLogout = () => {
    eraseCookie(authKey);
    setUser(null);
  };

  const login = (token) => {
    // Implement setCookie function based on your logic
    setCookie(authKey, token);
  };

  const info = {
    user,
    loading,
    login,
    logout: handleLogout,
    setLoading
  };
  user;
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
