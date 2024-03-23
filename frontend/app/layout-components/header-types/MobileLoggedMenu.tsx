"use client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import NavLink from '../NavLink';
import NavButton from '../NavButton';
import { Button } from '@/components/ui/button';
/**
 * @author Louis Figes W21017657
 */
export default function MobileLoggedMenu({ user, logout, userTypes } : {user:any; logout:any; userTypes:any;}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">{user.firstName ? user.firstName : 'Profile'}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md text-center">
          <DrawerHeader>
            <DrawerTitle>{user.firstName ? user.firstName : 'Profile'}</DrawerTitle>
            <DrawerDescription>Manage your profile</DrawerDescription>
          </DrawerHeader>
          <div className="pb-0 flex flex-col gap-4">
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
            {(userTypes && userTypes.length > 0) && userTypes.includes('councillor') && (
              <NavLink
              title="Councillor"
              href="/councillor"
              description="See data and statistics"
            />)}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}