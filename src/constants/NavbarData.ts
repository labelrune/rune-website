import { NavbarType } from "src/types/NavbarType";

export const NavItems: NavbarType[] = [
  {
    id: "1",
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    isHighlighted: false,
    hasDropdown: false,
  },
  {
    id: "2",
    label: "Discover Styles",
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
    label: "About Brand",
    href: "/our-story",
    hasDropdown: false,
  },
  { id: "5", label: "Contact", href: "/contact", hasDropdown: false },
];
