"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import GoogleEditProfile from "@/app/(user-subsystem)/components/profile/GoogleEditProfile";
import ProfileDelete from "./delete/ProfileDelete";
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
      <div className="flex flex-col gap-4 mx-auto p-4 items-center">
        <GoogleEditProfile />
        <ProfileDelete />
        <ProfilePassword />
      </div>
    </div>
  );
}
export default OAuthProfile;