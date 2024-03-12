"use client";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

import { oAuthConfig } from "@/config/oauth";
import { init } from "next/dist/compiled/webpack/webpack";

/**
 * Rehydrates the user subsystem on the client side
 */

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { initFromLocalStorage, status} = useUserSubsystem();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user") && !status.logged) {
      initFromLocalStorage();
    }
  }, [status.logged]);

  return (
    <GoogleOAuthProvider clientId={oAuthConfig.clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
