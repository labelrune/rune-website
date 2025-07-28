"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import NavbarDisclaimer from "./NavbarDisclaimer";
import { FiSearch, FiUser, FiShoppingBag, FiChevronDown } from "react-icons/fi";
import { NavItems } from "src/constants/NavbarData";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <Link
                href="/"
                className="flex items-center space-x-2 italic text-5xl"
              >
                Rune
              </Link>

              <div className="flex items-center space-x-8">
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
            </div>

            <div className="flex items-center space-x-6">
              <button aria-label="Search">
                <FiSearch className="w-5 h-5 text-gray-800 hover:text-gray-600" />
              </button>
              <Link href={"/"} aria-label="Account">
                <FiUser className="w-5 h-5 text-gray-800 hover:text-gray-600" />
              </Link>
              <Link href={"/"} aria-label="Cart">
                <FiShoppingBag className="w-5 h-5 text-gray-800 hover:text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
