"use client";
import { useUserSubsystem } from "@/hooks/user-subsystem/use-user-subsystem";
import { useEffect } from "react";

/**
 * Rehydrates the user subsystem on the client side
 */

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { getCurrentUser, user } = useUserSubsystem();

  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  return <>{children}</>;
}
