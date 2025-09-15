"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import NavbarDisclaimer from "./NavbarDisclaimer";
import { FiUser, FiChevronDown, FiX, FiMenu } from "react-icons/fi";
import { NavItems } from "src/constants/NavbarData";
import { useRouter } from "next/navigation";

import localFont from "next/font/local";

const LogoFont = localFont({
  src: "./TrajanPro-Regular.otf",
});

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState<
    string | null
  >("2");
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={navRef} className="fixed top-0 left-0 w-full z-50">
        <NavbarDisclaimer />

        <nav className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Left: Hamburger (mobile only) */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                  className="text-2xl text-gray-800"
                >
                  {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
              </div>

              <Link
                href="/"
                className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-2"
              >
                <img
                  src="/rune-text.png"
                  alt="rune-text"
                  className="h-32 w-32 object-cover"
                />
              </Link>

              <div className="flex items-center space-x-8 max-sm:hidden">
                {NavItems.map((item) => {
                  const isOpen = openDropdown === item.id;

                  return (
                    <div key={item.id} className="relative cursor-pointer">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.hasDropdown) {
                            setOpenDropdown(isOpen ? null : item.id);
                          } else {
                            setOpenDropdown(null);
                            router.push(item.href);
                          }
                        }}
                        className={`flex items-center gap-1 text-sm ${
                          item.isHighlighted
                            ? "text-red-500"
                            : "text-gray-800 hover:text-gray-600"
                        } hover:underline hover:underline-offset-4`}
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <FiChevronDown
                            className={`text-lg transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>

                      {item.hasDropdown && isOpen && (
                        <ul className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 shadow-md z-20">
                          {item.dropdownItems!.map((dd) => (
                            <li key={dd.label}>
                              <Link
                                href={dd.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {dd.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center space-x-6">
                {/* <button aria-label="Search">
                  <FiSearch className="w-5 h-5 text-gray-800 hover:text-gray-600" />
                </button>
                <Link href={"/"} aria-label="Account" className="hidden md:block">
                  <FiUser className="w-5 h-5 text-gray-800 hover:text-gray-600" />
                </Link>
                <Link href="/" aria-label="Cart">
                  <FiShoppingBag className="w-5 h-5 text-gray-800 hover:text-gray-600" />
                </Link> */}
              </div>
            </div>
          </div>

          <div
            className={`fixed bg-white bottom-0 left-0 h-[calc(100dvh-96px)] flex flex-col justify-center gap-3 w-3/4 max-w-xs transform transition-transform duration-300 z-40 ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            <div className="p-6 space-y-4">
              {NavItems.map((item) => {
                const isExpanded = expandedMobileDropdown === item.id;

                return (
                  <div key={item.id}>
                    {item.hasDropdown ? (
                      <div className={`${isExpanded ? "h-40" : "h-8"} transition-all`}>
                        <button
                          className="flex justify-between items-center w-full text-left text-xl text-gray-800"
                          onClick={() =>
                            setExpandedMobileDropdown(
                              isExpanded ? null : item.id
                            )
                          }
                        >
                          <span
                            className={`${
                              item.isHighlighted
                                ? "text-red-500"
                                : "text-gray-800"
                            }`}
                          >
                            {item.label}
                          </span>
                          <FiChevronDown
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <div className="pl-4 mt-2 space-y-2">
                            {item.dropdownItems!.map((dd) => (
                              <Link
                                key={dd.label}
                                href={dd.href}
                                className="block text-gray-600 text-base"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setExpandedMobileDropdown(null);
                                }}
                              >
                                {dd.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block text-lg ${
                          item.isHighlighted ? "text-red-500" : "text-gray-800"
                        }`}
                        onClick={() => {
                          setOpenDropdown(null);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {mobileMenuOpen && (
            <div
              className="fixed bottom-0 right-0 w-full bg-black opacity-50 h-[calc(100dvh-97px)] z-30 md:hidden"
              onClick={toggleMobileMenu}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
