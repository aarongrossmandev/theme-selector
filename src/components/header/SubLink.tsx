import { SubLinks } from "@/constants/navLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SubLink({
  subLink,
  index,
}: {
  subLink: SubLinks;
  index: number;
}) {
  return (
    <>
      <React.Fragment key={index}>
        {subLink.header && (
          <div className="space-y-2">
            <div className="text-primary font-bold pb-1">{subLink.header}</div>
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
            <div className="text-center pt-2">{subImage.label}</div>
          </div>
        ))}
      </React.Fragment>
    </>
  );
}
