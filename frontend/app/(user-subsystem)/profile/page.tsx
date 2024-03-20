"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import ProfileEmail from "../components/profile/email/ProfileEmail";
import requireAuth from "../components/auth/requireAuth";
import GoogleEditProfile from "@/app/(user-subsystem)/components/profile/GoogleEditProfile";
import OrderHistory from "../components/profile/OrderHistory";
import EditProfile from "../components/profile/EditProfile";
import ProfilePassword from "../components/profile/password/ProfilePassword";

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
        <div className="flex flex-col lg:flex-row gap-4 mx-auto p-4">
          {isOAuth ? <GoogleEditProfile /> :  <EditProfile /> }
          {!isOAuth && <ProfileEmail />}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mx-auto p-4">
          <OrderHistory />
          <ProfilePassword />
      </div>
    </main>
  );
}
export default requireAuth(Profile);