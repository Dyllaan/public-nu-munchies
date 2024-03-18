"use client";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

import { oAuthConfig } from "@/config/oauth";

/**
 * Rehydrates the user subsystem on the client side
 */

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { checkToken, loading, logged} = useUserSubsystem();

  useEffect(() => {
    console.log("here auth");
    checkToken;
  }, []);

  return (
    <GoogleOAuthProvider clientId={oAuthConfig.clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
