import ThemeSwitcher from "@/components/ThemeSwitcher";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div className="flex flex-col items-center justify-center bg-background-transparent p-20 mt-48 order-last md:order-1">
          <h2 className="font-bold text-accent text-4xl">Home Page</h2>
          <p className="text-muted">
            This is a multi theme demo website using nextjs, tailwind, and
            next-themes
          </p>
          <div className="flex flex-wrap items-center jsutify-center gap-3 pt-4">
            <button className="bg-accent border-accent hover:bg-secondary py-2 px-4 rounded-md transition">
              Subscribe
            </button>
          </div>
        </div>
        <div className="relative w-full h-[80vh]">
          <Image
            src="/snowboarder.png"
            alt="snowboarder hero"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
}
