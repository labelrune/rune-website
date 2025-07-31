export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterData = {
  quickLinks: FooterSection;
  info: FooterSection;
};
