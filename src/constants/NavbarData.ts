import { NavbarType } from "src/types/NavbarType";

export const NavItems: NavbarType[] = [
  {
    id: "1",
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    isHighlighted: true,
    hasDropdown: false,
  },
  {
    id: "2",
    label: "Shop",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Shop All", href: "/collections/all" },
      { label: "Kurtas", href: "/collections/kurta" },
      { label: "Anarkalis", href: "/collections/anarkali" },
      { label: "Dresses", href: "/collections/dress" },
    ],
  },
  // { id: "3", label: "Bestsellers", href: "#", hasDropdown: false },
  {
    id: "4",
    label: "The Brand",
    href: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Our Story", href: "/our-story" },
      { label: "Our Tribe", href: "/our-tribe" },
    ],
  },
  { id: "5", label: "Contact", href: "/contact", hasDropdown: false },
];
