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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";

export default function Header() {
  const { user } = useUserSubsystem();

  return (
    <div className="static top-0 right-0 !w-full py-4 px-5 md:px-[10%] bg-white z-20">
      <NavigationMenu className="flex justify-between items-center  !max-w-full !static">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "!bg-transparent px-0 hover:text-blue-600"
              )}
              href="/business"
            >
              NU Munchies
              <span className="hidden md:inline"> - Business Subsystem</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="md:flex hidden items-center gap-1 max-w-full md:flex-row flex-col">
          {LoggedInMenu(user)}
        </NavigationMenuList>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="w-full max-w-full md:hidden">
            <NavigationMenuList className="flex flex-col items-center gap-2 md:hidden mt-10">
              {LoggedInMenu(user)}
            </NavigationMenuList>
          </SheetContent>
        </Sheet>
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
            "md:hidden lg:inline",
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
            "md:hidden lg:inline",
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
            "bg-gray-100 hover:bg-transparent rounded-lg !py-2 text-sm px-3 font-semibold",
            "hover:bg-gray-200",
            "focus:bg-gray-200"
          )}
          href="/"
        >
          Back to Home
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};
