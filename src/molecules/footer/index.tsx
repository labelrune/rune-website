import Link from "next/link";
import { CgPaypal } from "react-icons/cg";
import { FaInstagram, FaFacebookF, FaGooglePay } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiPaytm, SiVisa } from "react-icons/si";
import { footerData } from "src/constants/FooterData";

export const Footer = () => {
  return (
    <footer className="bg-white text-black px-6 py-12 md:px-16 border-t-2 border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 max-sm:gap-10 mb-10">
        <div className="flex justify-center md:justify-start">
          <Link
            href="/"
            className="flex items-center text-xl font-serif tracking-wide"
          >
            <img src="/logo.png" alt="Logo" className="h-6 mr-2" />
            RUNE
          </Link>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">
            {footerData.quickLinks.title}
          </h3>
          <ul className="space-y-2 text-sm">
            {footerData.quickLinks.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">{footerData.info.title}</h3>
          <ul className="space-y-2 text-sm">
            {footerData.info.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {footerData.socials.map((social) => {
              const Icon = require("react-icons/fa")[social.icon];
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-600"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* <div>
          <h3 className="font-serif text-lg mb-4">Join our mailing list</h3>
          <div className="flex border border-black rounded-sm overflow-hidden">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-3 py-2 outline-none text-sm"
            />
            <button className="px-4 bg-transparent text-xl">
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div> */}
      </div>

      {/* <div className="flex justify-end gap-6 mt-10 pr-2 md:pb-5 pb-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="text-xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-xl" />
        </a>
      </div> */}
      <div className="border-t border-gray-300 flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-xs text-center md:text-left">
          Copyright©RUNE. All rights reserved
        </p>
      </div>
    </footer>
  );
};
