"use client";

import { Links } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  link: Links;
  hovering: number | null;
  index: number;
  handleMouseEnter: (index: number) => void;
};

export default function NavLink({
  handleMouseEnter,
  hovering,
  index,
  link,
}: NavLinkProps) {
  const pathname = usePathname();
  return (
    <div
      key={link.label}
      className="block group"
      onMouseEnter={() => handleMouseEnter(index)}
    >
      <Link
        href={link.href}
        className={cn(
          "text-muted flex items-center gap-x-0.5 group-hover:text-accent transition-all px-3 py-1 rounded-md hover:bg-secondary",
          pathname === link.href && "text-accent font-semibold bg-secondary",
          hovering === index && "text-accent font-semibold bg-secondary"
        )}
      >
        {link.label}
        {link.subLinks && (
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-all group-hover:text-accent",
              hovering === index && "rotate-180"
            )}
          />
        )}
      </Link>
    </div>
  );
}
