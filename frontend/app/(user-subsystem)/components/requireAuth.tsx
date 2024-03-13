"use client";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import Loading from './Loading';
import VerifyEmail from './VerifyEmail';
import RedirectTo from "./RedirectTo";
import { useEffect } from "react";

export default function requireAuth(ChildComponents: any, pageNeedsAuth: boolean = true) {
    const RequireAuthComponent = (props: any) => {
        const { loading, logged, user, checkToken } = useUserSubsystem();

        useEffect(() => {
            checkToken();
          }, []);
        
        if(loading) {
            return <Loading action={"Logging you in..."} />;
        } else {
            if(!pageNeedsAuth && logged) {
                return <RedirectTo to="/profile" message="Redirecting to profile..."/>
            } else if(pageNeedsAuth && !logged) {
                return <RedirectTo to="/login" message="Redirecting to login..." />
            } else if (!user.verified && logged) {
                return <VerifyEmail />;
            } else {
                return <ChildComponents {...props} />;
            }
        }
    };

    RequireAuthComponent.displayName = `requireAuth(${ChildComponents.displayName || ChildComponents.name || 'Component'})`;

    return RequireAuthComponent;
}