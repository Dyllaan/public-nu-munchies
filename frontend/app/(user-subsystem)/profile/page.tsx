"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import EditProfile from "@/app/(user-subsystem)/components/EditProfile";
import requireAuth from "../components/requireAuth";

import "../css/user.css";

function Profile() {
  const { user, logout } = useUserSubsystem();

  return (
    <main className="flex flex-col text-center">
      <h1 className="text-4xl font-bold">
        Welcome to Profile Page {user.firstName} !
      </h1>
      <button onClick={logout} className="btn">
        Logout
      </button>
      <EditProfile />
    </main>
  );
}
export default requireAuth(Profile);
