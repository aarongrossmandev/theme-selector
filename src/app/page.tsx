import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-4xl font-semibold text-accent">Theme change</div>
      <div className="flex flex-col gap-10">
        <ThemeSwitcher />
        <button className="bg-accent h-10 py-2 px-4 hover:bg-secondary hover:text-accent border border-border hover:border-accent shadow-md shadow-accent rounded-md transition">
          Subscribe!
        </button>
      </div>
    </div>
  );
}
