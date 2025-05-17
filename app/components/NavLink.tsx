import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const NavLink = ({
  href,
  children,
  className,
  onClick,
  "aria-label": ariaLabel,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        className,
        " text-card px-2 py-2 rounded-lg h-fit w-fit text-4xl md:text-7xl font-medium active:text-primary hover:bg-transparent hover:text-primary transition-colors duration-300"
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default NavLink;
