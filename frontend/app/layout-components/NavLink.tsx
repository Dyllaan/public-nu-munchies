"use client";
import PropTypes from 'prop-types';
import Link from 'next/link';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

interface NavLinkProps {
    title: string;
    href: string;
    description: string;
  }

export default function NavLink({ title, href, description }: NavLinkProps) {
  return (
    <NavigationMenuLink asChild>
      <Link
        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md"
        href={href}
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
