"use client";
import {
  DropdownContent,
  DropdownHeader,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "@/components/ui/Dropdown";
import { DropdownProvider } from "@/contexts/useDropdown";
import React from "react";

export default function AboutPage() {
  return (
    <div className="w-fit">
      <DropdownProvider>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent side="left">
          <DropdownHeader>Testing</DropdownHeader>
          <DropdownLabel>First Test</DropdownLabel>
          <DropdownItem className="block">
            this is another display of the dropdown
          </DropdownItem>
        </DropdownContent>
      </DropdownProvider>
    </div>
  );
}
