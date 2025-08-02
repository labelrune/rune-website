export type NavbarType = {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    href: string;
  }[];
  isHighlighted?: boolean;
};
