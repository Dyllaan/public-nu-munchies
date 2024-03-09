"use client";
import React from 'react';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';
import Loading from './Loading';
import Link from 'next/link';

export default function requireAuth(ChildComponents: any, auth: boolean = true) {
    const RequireAuthComponent = (props: any) => {
        const { status } = useUserSubsystem();

        const isAuthenticated = status.logged;

        if (status.loading) {
            return <Loading action={"Logging you in..."} />;
        } else if (auth && isAuthenticated) {
            return <ChildComponents {...props} />;
        }
        else if (!auth && !isAuthenticated) {
            return <ChildComponents {...props} />;
        }

        else {
            return auth ? 
            <div>
                <p>Not Logged In</p>
                <Link href="/login">
                    Login
                </Link>
            </div> : 
            <div>
                <p>Already Logged In</p>
                <Link href="/profile">
                    Profile
                </Link>
            </div>;
        }
    };

    RequireAuthComponent.displayName = `requireAuth(${ChildComponents.displayName || ChildComponents.name || 'Component'})`;

    return RequireAuthComponent;
}
