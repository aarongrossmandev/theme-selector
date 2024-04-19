"use client";

import { links } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ThemeSwitch from "../ThemeSwitch";
import MenuImage from "./MenuImage";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import SubLink from "./SubLink";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovering, setHovering] = useState<number | null>(null);
  const subRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY >= 20) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleMouseEnter(index: number) {
    if (links[index].subLinks) {
      setHovering(index);
    } else {
      setHovering(null);
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-accent bg-background backdrop-blur supports-[backdrop-filter]:bg-background-transparent transition-all px-3",
        isScrolled && "shadow-sm shadow-accent"
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between mx-auto">
        {/* Mobile sidebar */}
        <MobileNav />
        <div className="hidden md:flex items-center gap-x-10">
          <Link
            href="/"
            className="relative items-center gap-x-3 flex font-bold text-muted hover:text-accent text-3xl transition ease-in-out"
          >
            Logo
          </Link>
          <nav
            className="flex items-center gap-3"
            onMouseLeave={() => {
              if (!subRef.current) {
                setHovering(null);
              }
            }}
          >
            {links.map((link, index) => (
              <NavLink
                key={link.label + index}
                link={link}
                index={index}
                hovering={hovering}
                handleMouseEnter={handleMouseEnter}
              />
            ))}

            <div
              ref={subRef}
              className={cn(
                "absolute top-14 left-0 p-8 w-full bg-background transition-all ease-in-out",
                hovering || hovering === 0
                  ? "opacity-100 border-t border-b border-accent"
                  : "opacity-0 border-none"
              )}
              onMouseLeave={() => setHovering(null)}
            >
              <div className="grid grid-cols-4 max-w-[1560px] mx-auto gap-6">
                <MenuImage hovering={hovering} />
                {hovering !== null &&
                  links[hovering].subLinks?.map((subLink, index) => (
                    <SubLink key={index} index={index} subLink={subLink} />
                  ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeSwitch />
          <div className="aspect-square h-10 rounded-full overflow-hidden relative">
            <Image
              src="/witch.jpg"
              alt="profile"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
