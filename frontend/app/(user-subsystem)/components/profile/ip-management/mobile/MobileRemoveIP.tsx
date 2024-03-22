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
import { Button } from '@/components/ui/button';
/**
 * @author Louis Figes W21017657
 */
export default function MobileRemoveIP({ip, removeIP} : {ip:any; removeIP:any;}) {
  const created = new Date(ip.created_at).toLocaleDateString();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">{ip.ip_address}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{ip.ip_address}</DrawerTitle>
            <DrawerDescription>
              {created}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 flex flex-col">
            <Button onClick={() => removeIP(ip.ip_address)} variant="destructive">Remove</Button>
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