"use client";
import useUserSubsystem from "@/hooks/user-subsystem/use-user-subsystem";
import LoadingInPage from '../reusable/LoadingInPage';
import RedirectTo from "../reusable/RedirectTo";
import Verify from "../Verify";
import BannedScreen from "./BannedScreen";
import requireAuth from "./requireAuth";

export default function requireType(ChildComponents: any, type: string) {
    const RequireTypeComponent = (props: any) => {
        const { loading, logged, user, userTypes } = useUserSubsystem();

        if(loading) {
            return <LoadingInPage />;
        } else if(!logged && !loading) {
            return <RedirectTo to={"/login"} message="You need to be logged in to view this page" />;
        } else if(!logged && loading) {
            return <p>Loading</p>
        } else {
            if(userTypes.moderator === true && type === 'moderator') {
                return <ChildComponents {...props} />;
            }

            if(userTypes.councillor === true && type === 'councillor') {
                return <ChildComponents {...props} />;
            }
        }
    };

    RequireTypeComponent.displayName = `requireType(${ChildComponents.displayName || ChildComponents.name || 'Component'})`;

    return RequireTypeComponent;
}