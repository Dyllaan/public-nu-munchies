"use client";
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from 'next/link';

interface NavLinkProps {
    title: string;
    onClick: () => void;
    description: string;
  }

export default function NavButton({ title, onClick, description }: NavLinkProps) {
return (
    <NavigationMenuLink asChild>
        <Link
            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md"
            onClick={onClick}
            href="#"
        >
            <div className="text-lg font-medium">
                <p>{title}</p>
            </div>
            <p className="text-sm leading-tight text-muted-foreground">
                {description}
            </p>
        </Link>
    </NavigationMenuLink>
);
}
