import { FooterData } from "src/types/FooterTypes";

export const footerData: FooterData = {
  quickLinks: {
    title: "Quick links",
    links: [
      { label: "Shop All", href: "/collections/all" },
      { label: "Kurtas", href: "/collections/kurta" },
      { label: "Anarkalis", href: "/collections/anarkali" },
      { label: "Dresses", href: "/collections/dress" },
    ],
  },
  info: {
    title: "Info",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Return & Refund", href: "/returns" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Contact", href: "/contact" },
    ],
  },
  socials: [
    { icon: "FaInstagram", href: "https://instagram.com/label_rune" },
    { icon: "FaFacebook", href: "#" },
    { icon: "FaTwitter", href: "#" },
  ],
};
