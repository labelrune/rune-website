import React from "react";
import Marquee from "react-fast-marquee";
import { FaHeadset, FaLock, FaShieldAlt, FaTruck } from "react-icons/fa";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { FcRuler } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { HiScissors } from "react-icons/hi";
import { IoHeart } from "react-icons/io5";

export const defaultItems: { icon: React.ReactNode; label: string }[] = [
  {
    icon: <HiScissors className="size-5" aria-hidden />,
    label: "Made to Measure",
  },
  {
    icon: <IoHeart className="size-5 text-red-600" aria-hidden />,
    label: "Handmade with Love",
  },
  { icon: <FcRuler className="size-5" aria-hidden />, label: "Size Inclusive" },
  // { icon: <FaHeadset className="size-5" aria-hidden />, label: "24×7 Support" },
  // { icon: <FaCcVisa className="size-6" aria-hidden />, label: "Visa Accepted" },
  // {
  //   icon: <FaCcMastercard className="size-6" aria-hidden />,
  //   label: "Mastercard",
  // },
];

export default function FeatureMarquee({
  items = defaultItems,
  speed = 40,
  pauseOnHover = true,
  showGradient = true,
}: {
  items?: { icon: React.ReactNode; label: string }[];
  speed?: number;
  pauseOnHover?: boolean;
  showGradient?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl bg-white">
        {showGradient && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
          </>
        )}

        <Marquee speed={speed} pauseOnHover={pauseOnHover} gradient={true}>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-6 py-3 pr-6">
            {items.map((it) => (
              <li
                key={it.label}
                className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-md"
                aria-label={typeof it.label === "string" ? it.label : undefined}
              >
                <span className="text-gray-800">{it.icon}</span>
                <span className="whitespace-nowrap">{it.label}</span>
              </li>
            ))}
          </ul>
        </Marquee>
      </div>
    </div>
  );
}
