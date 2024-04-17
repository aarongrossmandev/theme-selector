import { links } from "@/constants/navLinks";
import Image from "next/image";

export default function MenuImage({ hovering }: { hovering: number | null }) {
  return (
    <>
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
          <div className="text-center pt-2">{links[hovering].caption}</div>
        </div>
      )}
    </>
  );
}
