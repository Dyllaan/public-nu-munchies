"use client";

import BusinessStats from '../components/BusinessStats'
import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

function Page() {
    const { user, logout, isOAuth } = useUserSubsystem();
    console.log(user);
    return (
      <>
        <BusinessStats />
      </>
    );
  }
export default requireAuth(Page)