"use client";
import useModerator from "@/hooks/user-subsystem/use-moderator";
import Loading from '../Loading';
import VerifyEmail from '../VerifyEmail';
import RedirectTo from "../RedirectTo";
import { useEffect } from "react";

export default function requireMod(ChildComponents: any) {
    const RequireModComponent = (props: any) => {
        const { moderator, loadingStatus, checkModerator } = useModerator();

        if(loadingStatus) {
            return <Loading action={"Verifying your status"} />;
        } else {
            if(!moderator) {
                return <p>not moderator</p>;
            } else {
                return <ChildComponents {...props} />;
            }
        }
    };

    RequireModComponent.displayName = `RequireMod(${ChildComponents.displayName || ChildComponents.name || 'Component'})`;

    return RequireModComponent;
}