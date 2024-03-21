"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import { UserState } from "@/stores/auth";

export default function Header() {
  const { user } = useUserSubsystem();

  return (
    <div className="static top-0 right-0 !w-full py-4 px-[10%] bg-white z-20">
      <NavigationMenu className="flex md:justify-between md:items-center md:flex-row flex-col !max-w-full !static">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "md:block hidden",
                "!bg-transparent px-0 hover:text-blue-600"
              )}
              href="/business"
            >
              NU Munchies - Business Subsystem
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="flex items-start md:items-center gap-1 max-w-full md:flex-row flex-col">
          {LoggedInMenu(user)}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const LoggedInMenu = (user: UserState) => {
  return (
    <>
      <NavigationMenuItem className="relative">
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-transparent",
            "hover:text-blue-600",
            "focus:bg-transparent focus:text-blue-600"
          )}
          href="/businesses"
        >
          View Businesses
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative">
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-transparent",
            "hover:text-blue-600",
            "focus:bg-transparent focus:text-blue-600"
          )}
          href="/businesses/dashboard"
        >
          Manage My Businesses
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative">
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-transparent",
            "hover:text-blue-600",
            "focus:bg-transparent focus:text-blue-600"
          )}
          href="/business/create"
        >
          Create Business
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem className="relative">
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            "bg-transparent hover:bg-transparent",
            "hover:text-blue-600",
            "focus:bg-transparent focus:text-blue-600"
          )}
          href="/"
        >
          Back to Home
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};
