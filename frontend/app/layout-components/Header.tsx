"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./header-types/DesktopHeader";
import { BrowserView, MobileView } from "react-device-detect";

/**
 * @author Louis Figes W21017657
 */

function Mobile() {
  return (
  <NavigationMenu>
      <NavigationMenuList>
          <MobileHeader />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function Desktop() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
          <DesktopHeader />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function Header() {
  return (
    <div>
      <BrowserView>
        <Desktop />
      </BrowserView>
      <MobileView>
        <Mobile />
      </MobileView>
    </div>
  );
}