"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./header-types/DesktopHeader";

/**
 * @author Louis Figes W21017657
 */

export default function Header() {
  
  /**
  * Arbitrary breakpoint for mobile 
  * Suggested by: https://testsigma.com/blog/css-breakpoints/
  * I know this is not a good source
  */
  const isMobile = window.innerWidth < 480;
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </NavigationMenuList>
    </NavigationMenu>
  );
}