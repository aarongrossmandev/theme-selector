"use client";

import { useDropdown } from "@/contexts/useDropdown";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, ref) => {
  const { closeDropdown, isOpen, openDropdown } = useDropdown();
  return (
    <button
      ref={ref}
      onClick={isOpen ? closeDropdown : openDropdown}
      className={cn(
        "bg-transparent border-none ring-0 rounded-md text-primary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

const DropdownHeader = forwardRef<
  HTMLParagraphElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-base font-semibold", className)}
      {...props}
    >
      {children}
    </p>
  );
});

const DropdownLabel = forwardRef<
  HTMLParagraphElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm font-semibold", className)} {...props}>
      {children}
    </p>
  );
});

const DropdownItem = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("grid grid-cols-3 gap-3 mt-3", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const DropdownContent = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className?: string;
    sideOffSet?: number;
    side?: "left" | "right";
    align?: "top" | "bottom";
    alignOffSet?: number;
  }
>(
  (
    {
      children,
      className,
      align = "top",
      alignOffSet = "auto",
      side = "right",
      sideOffSet = -4,
      ...props
    },
    ref
  ) => {
    const { isOpen } = useDropdown();
    return (
      <div
        ref={ref}
        className={cn(
          "absolute transition-all z-[60] ease-out duration-200 w-[350px] bg-secondary border border-accent p-3 rounded-md overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
        style={{
          top: align === "top" ? alignOffSet : "auto",
          bottom: align === "bottom" ? alignOffSet : "auto",
          right: side === "right" ? sideOffSet : "auto",
          left: side === "left" ? sideOffSet : "auto",
        }}
        {...props}
      >
        <div className={cn("flex flex-col space-y-3", className)}>
          {children}
        </div>
      </div>
    );
  }
);

DropdownTrigger.displayName = "DropdownTrigger";
DropdownHeader.displayName = "DropdownHeader";
DropdownLabel.displayName = "DropdownLabel";
DropdownItem.displayName = "DropdownItem";
DropdownContent.displayName = "DropdownContent";

export {
  DropdownContent,
  DropdownHeader,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
};
