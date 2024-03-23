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
  } from "@/components/ui/drawer";
import NavLink from '../NavLink';
import { Button } from '@/components/ui/button';
/**
 * @author Louis Figes W21017657
 */
export default function MobileGuestMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">Guest</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Welcome</DrawerTitle>
            <DrawerDescription className="underline italic">The start of something new.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex flex-col gap-2 items-center">
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