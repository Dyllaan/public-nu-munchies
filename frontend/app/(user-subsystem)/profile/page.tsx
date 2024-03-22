"use client";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import requireAuth from "../components/auth/requireAuth";
import TabbedProfile from "../components/profile/TabbedProfile";

function Profile() {
  const { user, logout, isOAuth, userTypes } = useUserSubsystem();

  let dateString = '';
  if (user.created_at) {
    const date = new Date(user.created_at);
    dateString = date.toISOString().split('T')[0];
  }

  return (
    <main className="flex flex-col text-center">
      <h1 className="text-4xl font-bold">
        Welcome to Profile Page {user.firstName} !
      </h1>
        <h2>Joined: {dateString}</h2>
        <TabbedProfile />
    </main>
  );
}
export default requireAuth(Profile);
