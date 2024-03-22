import { useState} from "react";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";
import MobileLoggedMenu from "./header-types/MobileLoggedMenu";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import MobilePagesMenu from "./header-types/MobilePagesHeader";
import Link from "next/link";
import MobileGuestMenu from "./header-types/MobileGuestMenu";

export default function MobileHeader() {

    const { user, logout, logged, userTypes } = useUserSubsystem();

    return (
        <>
            <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            {logged ? (
            <MobileLoggedMenu user={user} logout={logout} userTypes={userTypes} />
            ) :
            (
                <MobileGuestMenu />
            )}
            <MobilePagesMenu />
        </>
    )
}
