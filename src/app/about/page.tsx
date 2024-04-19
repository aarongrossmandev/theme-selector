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
    <DropdownProvider>
      <DropdownTrigger>Open</DropdownTrigger>
      <DropdownContent>
        <DropdownHeader>Testing</DropdownHeader>
        <DropdownLabel>First Test</DropdownLabel>
        <DropdownItem className="block">
          this is another display of the dropdown
        </DropdownItem>
      </DropdownContent>
    </DropdownProvider>
  );
}
