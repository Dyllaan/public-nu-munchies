"use client";
import PropTypes from 'prop-types';
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

interface NavLinkProps {
    title: string;
    href?: string | undefined;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>; // Making onClick optional
    description: string;
  }

export default function NavLink({ title, href, onClick, description }: NavLinkProps) {
  return (
    <NavigationMenuLink asChild>
      <a
        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md"
        href={href}
        onClick={onClick} // Directly using onClick. Ensure to pass a function when using the component or it will be undefined.
      >
        <div className="text-lg font-medium">
          <p>{title}</p>
        </div>
        <p className="text-sm leading-tight text-muted-foreground">
          {description}
        </p>
      </a>
    </NavigationMenuLink>
  );
}
