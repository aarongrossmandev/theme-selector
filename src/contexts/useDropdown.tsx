import { createContext, useContext, useEffect, useRef, useState } from "react";

interface DropdownContextType {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown context must be used within a dropdown provider");
  }
  return context;
}

export const DropdownProvider = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isOpen = open !== undefined ? open : dropdownOpen;
  const setIsOpen = setOpen !== undefined ? setOpen : setDropdownOpen;

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setIsOpen]);

  const contextValue: DropdownContextType = {
    isOpen,
    openDropdown,
    closeDropdown,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};
