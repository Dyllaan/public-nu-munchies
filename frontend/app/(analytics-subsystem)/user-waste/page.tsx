"use client";

import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import UserOrders from '../components/UserOrders';

function Page() {
    const { user, logout, isOAuth } = useUserSubsystem();
    console.log(user);
    return (
      <>
        <UserOrders />
      </>
    );
  }
export default requireAuth(Page)