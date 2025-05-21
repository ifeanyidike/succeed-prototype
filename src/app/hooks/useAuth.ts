import React, { useEffect, useState } from "react";
import { AuthSession } from "../lib/types";
import { getSession, logout } from "../lib/auth";
import { useRouter } from "next/navigation";

const useAuth = (redirectOnLogout = true, requireAuth = true) => {
  const [session, setSession] = useState<AuthSession | null>(getSession());
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const currentSession = getSession();
      setSession(currentSession);

      if (requireAuth && !currentSession) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(checkAuth, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, [router, redirectOnLogout, requireAuth]);

  const handleLogout = () => {
    logout();
    setSession(null);

    if (redirectOnLogout) {
      router.push("/login");
    }
  };

  return {
    session,
    loading,
    isAuthenticated: !!session,
    logout: handleLogout,
    user: session?.user,
    school: session?.school,
  };
};

export default useAuth;
