"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import NavLink from "./NavLink";
import NavButton from "./NavButton";

export default function Header() {
  const { user, logout, logged, userTypes } = useUserSubsystem();

  function loggedMenu() {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{user.firstName}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <NavLink
              title="Profile"
              href="/profile"
              description="View and edit your profile"
            />
            <NavButton
              title="Logout"
              onClick={logout}
              description="View and edit your profile"
            />
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  function guestMenu() {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>Guest</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <NavLink
              title="Login"
              href="/login"
              description="Log in to your account"
            />
            <NavLink
              title="Register"
              href="/register"
              description="Create a new account"
            />
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  function councillorMenu() {
    return (
      <NavigationMenuItem>
        <Link href="/councillor" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Councillor
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  }

  function moderatorMenu() {
    return (
      <NavigationMenuItem>
        <Link href="/moderator" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Moderator
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {logged ? loggedMenu() : guestMenu()}
        <NavigationMenuItem>

      
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
          
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/business"
          >
            Business
          </NavigationMenuLink>
        </NavigationMenuItem>
        {userTypes?.councillor ? councillorMenu() : null}
        {userTypes?.moderator ? moderatorMenu() : null}
      </NavigationMenuList>
    </NavigationMenu>
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
