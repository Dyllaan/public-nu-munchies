"use client";
import { useEffect, useState } from "react";

/**
 * @author Louis Figes W21017657
 */

export const useMobile = () => {

    /**
     * @author Volobot Advanced Systems
     * @author Raz Luvaton
     * https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto
     */

    const [width, setWidth] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>();

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
  
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        if (width < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [width]);

  return {
    isMobile,
  }
}