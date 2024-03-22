"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./header-types/DesktopHeader";
import { useMobile } from "@/hooks/user-subsystem/use-mobile";

/**
 * @author Louis Figes W21017657
 */

export default function Header() {
  const { isMobile } = useMobile();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isMobile === true ? <MobileHeader /> : <DesktopHeader />}
      </NavigationMenuList>
    </NavigationMenu>
  );
}