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
import { Button } from '@/components/ui/button';
/**
 * @author Louis Figes W21017657
 */
export default function MobilePagesMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">More</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Available pages</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <NavLink
              title="Nutrition"
              href="/logNutritions"
              description="View and add nutrition data"
            />
            <NavLink
              title="Business"
              href="/business"
              description="View and manage your business"
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