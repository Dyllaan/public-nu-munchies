"use client";

import { useUserSubsystem } from "@/hooks/user-subsystem/use-user-subsystem";

import "../css/user.css";

export default function Profile() {
  const { user } = useUserSubsystem();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Welcome to Profile Page {user.firstName} !
      </h1>
    </main>
  );
}
