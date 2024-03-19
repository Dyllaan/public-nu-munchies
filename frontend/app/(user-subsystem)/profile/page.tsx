"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import EditProfile from "@/app/(user-subsystem)/components/EditProfile";
import requireAuth from "../components/requireAuth";
import GoogleEditProfile from "@/app/(user-subsystem)/components/GoogleEditProfile";
import OrderHistory from "../components/OrderHistory";

function Profile() {
  const { user, logout, isOAuth } = useUserSubsystem();

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
        <button onClick={logout} className="btn">
          Logout
        </button>
        <div className="flex flex-col lg:flex-row gap-4 mx-auto p-4">
     {isOAuth ? <GoogleEditProfile /> :  <EditProfile />}
     <OrderHistory />
      </div>
    </main>
  );
}
export default requireAuth(Profile);