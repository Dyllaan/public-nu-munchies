"use client";
import useModerator from "@/hooks/user-subsystem/use-moderator";
import Loading from '../Loading';
import RedirectTo from "../RedirectTo";
import { useEffect } from "react";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";

export default function requireMod(ChildComponents: any) {
    const RequireModComponent = (props: any) => {
        const { moderator, loadingStatus, checkModerator } = useModerator();
        const { loading, logged } = useUserSubsystem();

        useEffect(() => {
            checkModerator();
        }, []);

        if(loading || loadingStatus) {
            return <Loading action={"Logging you in..."} />;
        } else if(!moderator && logged) {
            return <RedirectTo to={"/login"} message={"Access Denied"}/>;
        } else {
            return <ChildComponents {...props} />;
        }
    };

    RequireModComponent.displayName = `RequireMod(${ChildComponents.displayName || ChildComponents.name || 'Component'})`;

    return RequireModComponent;
}