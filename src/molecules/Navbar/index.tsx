"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import NavbarDisclaimer from "./NavbarDisclaimer";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { NavItems } from "src/constants/NavbarData";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileDropdown, setExpandedMobileDropdown] = useState<
    string | null
  >(null);
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
    <div ref={navRef} className="fixed top-0 left-0 w-full z-50">
      <NavbarDisclaimer />

      <nav className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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

            <div className="max-sm:flex-1 flex justify-center md:justify-start">
              <Link
                href="/"
                className="flex items-center text-xl font-serif tracking-wide"
              >
                <img src="/logo.png" alt="Logo" className="h-6 mr-2" />
                RUNE
              </Link>
            </div>

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
              <button aria-label="Search">
                <FiSearch className="w-5 h-5 text-gray-800 hover:text-gray-600" />
              </button>
              <Link href={"/"} aria-label="Account" className="hidden md:block">
                <FiUser className="w-5 h-5 text-gray-800 hover:text-gray-600" />
              </Link>
              <Link href="/" aria-label="Cart">
                <FiShoppingBag className="w-5 h-5 text-gray-800 hover:text-gray-600" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 z-40 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="p-6 space-y-4">
            {NavItems.map((item) => {
              const isExpanded = expandedMobileDropdown === item.id;

              return (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        className="flex justify-between items-center w-full text-left text-lg text-gray-800"
                        onClick={() =>
                          setExpandedMobileDropdown(isExpanded ? null : item.id)
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
          <div className="absolute bottom-6 left-6 text-gray-500 text-sm">
            <FiUser className="w-5 h-5 text-gray-800 hover:text-gray-600" />
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-100 z-30 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
