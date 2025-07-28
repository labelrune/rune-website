import { NavbarType } from "src/types/NavbarType";

export const NavItems: NavbarType[] = [
  {
    id: "1",
    label: "New Arrivals",
    href: "/",
    isHighlighted: true,
    hasDropdown: false,
  },
  {
    id: "2",
    label: "Shop",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Shop All", href: "#" },
      { label: "Kurtas", href: "#" },
      { label: "Anarkalis", href: "#" },
      { label: "Lehengas", href: "#" },
    ],
  },
  { id: "3", label: "Bestsellers", href: "#", hasDropdown: false },
  {
    id: "4",
    label: "The Brand",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Our Story", href: "#" },
      { label: "Our Tribe", href: "#" },
    ],
  },
  { id: "5", label: "Contact", href: "#", hasDropdown: false },
];
