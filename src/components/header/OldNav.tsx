"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { links } from "@/constants/navLinks";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Navbar() {
  const pathname = usePathname();
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
        "fixed top-0 z-50 w-full border-accent bg-background backdrop-blur supports-[backdrop-filter]:bg-background-transparent transition-all px-3",
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
              <div
                key={link.label}
                className="block group"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-muted flex items-center gap-x-0.5 group-hover:text-accent transition-all px-3 py-1 rounded-md hover:bg-secondary",
                    pathname === link.href &&
                      "text-accent font-semibold bg-secondary",
                    hovering === index &&
                      "text-accent font-semibold bg-secondary"
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
                {hovering !== null && links[hovering].navImage && (
                  <div className="flex flex-col">
                    <div className="relative w-full h-full rounded-md">
                      <Image
                        src={links[hovering].navImage as string}
                        alt={links[hovering].label}
                        fill
                        className="object-cover object-center rounded-md"
                      />
                    </div>
                    <div className="text-center pt-2">
                      {links[hovering].caption}
                    </div>
                  </div>
                )}
                {hovering !== null &&
                  links[hovering].subLinks?.map((subLink, index) => (
                    <React.Fragment key={index}>
                      {subLink.header && (
                        <div className="space-y-2">
                          <div className="text-primary font-bold pb-1">
                            {subLink.header}
                          </div>
                          {subLink.subMenu && (
                            <>
                              {subLink.subMenu.map((menuItem) => (
                                <Link
                                  key={menuItem.label}
                                  href={menuItem.href}
                                  className="text-muted block text-sm hover:text-accent transition"
                                >
                                  {menuItem.label}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                      {subLink.subImages?.map((subImage) => (
                        <div key={subImage.label}>
                          <Link
                            href={subImage.href}
                            className="relative block w-full h-[200px] rounded-md overflow-hidden group"
                          >
                            <Image
                              src={subImage.image}
                              alt={subImage.label}
                              fill
                              className="object-cover object-center rounded-md group-hover:scale-105 transition group-hover:opacity-80"
                            />
                          </Link>
                          <div className="text-center pt-2">
                            {subImage.label}
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />
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
