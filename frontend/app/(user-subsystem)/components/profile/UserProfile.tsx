"use client";

import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import ProfileEmail from "./email/ProfileEmail";
import requireAuth from "../auth/requireAuth";
import GoogleEditProfile from "@/app/(user-subsystem)/components/profile/GoogleEditProfile";
import EditProfile from "./EditProfile";
import ProfilePassword from "../profile/password/ProfilePassword";
import Moderator from "../moderator/Moderator";
import ProfileDelete from "./delete/ProfileDelete";

function UserProfile() {
  const { user, isOAuth} = useUserSubsystem();

  let dateString = '';
  if (user.created_at) {
    const date = new Date(user.created_at);
    dateString = date.toISOString().split('T')[0];
  }

  return (
    <>
      {isOAuth ? <GoogleEditProfile /> : (
      <div className="flex flex-col lg:flex-row gap-4 mx-auto p-4">
        <EditProfile />
        <ProfileEmail />
      </div>
      )}
      <div className="flex flex-col lg:flex-row gap-4 mx-auto p-4">
        <ProfileDelete />
        <ProfilePassword />
      </div>
    </>
  );
}
export default UserProfile;