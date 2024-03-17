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
  const { user, logout } = useUserSubsystem();

  return (
    <div className="fixed top-0 right-0 !w-full py-4 px-[10%] bg-white z-20">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), "md:block hidden")}
              href="/business"
            >
              NU Munchies - Business Subsystem
            </NavigationMenuLink>
            <div className="md:w-[50vw]"></div>
          </NavigationMenuItem>
          {LoggedInMenu(user)}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

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
    </>
  );
};
