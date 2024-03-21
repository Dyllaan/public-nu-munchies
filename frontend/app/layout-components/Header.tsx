"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./header-types/DesktopHeader";
import { useEffect, useState } from "react";

/**
 * @author Louis Figes W21017657
 */

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  /**
  * Arbitrary breakpoint for mobile 
  * Suggested by: https://testsigma.com/blog/css-breakpoints/
  * I know this is not a good source
  */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </NavigationMenuList>
    </NavigationMenu>
  );
}