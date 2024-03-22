"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import ProfileEmail from "./email/ProfileEmail";
import requireAuth from "../auth/requireAuth";
import GoogleEditProfile from "@/app/(user-subsystem)/components/profile/GoogleEditProfile";
import OrderHistory from "./OrderHistory";
import EditProfile from "./EditProfile";
import ProfilePassword from "../profile/password/ProfilePassword";

function OAuthProfile() {
  const { user} = useUserSubsystem();

  let dateString = '';
  if (user.created_at) {
    const date = new Date(user.created_at);
    dateString = date.toISOString().split('T')[0];
  }

  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto p-4">
            <GoogleEditProfile />
            <OrderHistory />
            <ProfilePassword />
      </div>
    </div>
  );
}
export default OAuthProfile;