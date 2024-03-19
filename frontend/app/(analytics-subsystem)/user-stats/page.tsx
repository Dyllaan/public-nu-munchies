"use client";

import UserStats from '../components/UserStats'
import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

function Page() {
    const { user, logout, isOAuth } = useUserSubsystem();
    console.log(user);
    return (
      <>
        <UserStats />
      </>
    );
  }
export default requireAuth(Page)