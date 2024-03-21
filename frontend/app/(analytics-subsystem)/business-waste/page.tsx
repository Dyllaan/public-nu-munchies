"use client";

import requireAuth from "../../(user-subsystem)/components/requireAuth";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import BusinessOrders from '../components/BusinessOrders';

function Page() {
    const { user, logout, isOAuth } = useUserSubsystem();
    console.log(user);
    return (
      <>
        <BusinessOrders />
      </>
    );
  }
export default requireAuth(Page)