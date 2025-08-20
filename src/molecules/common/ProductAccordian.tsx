"use client";

import { useState } from "react";
import { CgColorBucket } from "react-icons/cg";
import { FaTruck } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { IoChevronDownSharp } from "react-icons/io5";
import { AccordionItem } from "src/types/common";

const accordionData: AccordionItem[] = [
  {
    id: 1,
    title: "Shipping & Returns",
    content: (
      <div className="space-y-1 text-gray-700">
        <p className="font-medium">Estimated Shipping:</p>
        <p>
          This product will be dispatched in 10-12 business days. No refund,
          only exchange in case of size variations or genuine garment defects.
        </p>
      </div>
    ),
    icon: <FaTruck className="text-xl" />,
  },
  {
    id: 2,
    title: "General Care Instructions",
    content: (
      <ul className="space-y-1 text-gray-700">
        <li>• Dry Clean or Hand Wash Separately in Cold Water</li>
        <li>• Dry in Shade, Upside Down</li>
        <li>• Wash Whites Separately</li>
        <li>• Natural Colours May Bleed - Always Wash Separately</li>
      </ul>
    ),
    icon: <FaRegHeart className="text-xl" />,
  },
  {
    id: 3,
    title: "Color & Craft Notice",
    content: (
      <div className="space-y-1 text-gray-700">
        <p>
          Colors may vary slightly due to screen settings. Minor irregularities
          in embroidery, color, or print are natural and part of the product's
          handcrafted charm.
        </p>
      </div>
    ),
    icon: <CgColorBucket className="text-xl" />,
  },
  {
    id: 4,
    title: "Exchanges & Returns",
    content: (
      <ul className="space-y-1 text-gray-700">
        <li>
          • Minor irregularities in colour, texture, or weave are natural and
          not defects.
        </li>
        <li>
          • No returns; size exchanges accepted on unworn, unwashed items.
        </li>
        <li>
          • Returns are eligible for store credit only; refunds apply only to
          unfulfilled orders.
        </li>
        <li>• Report damaged items within 48 hours with proof.</li>
        <li>
          • Email reachus@labelrune.com with your order number for exchanges.
          Response within 5 working days.
        </li>
        <li>
          • No exchanges or returns on custom-made, international, or sale
          items.
        </li>
        <li>
          • Ship exchanges with a note including your name and return address.
        </li>
      </ul>
    ),
    icon: <GiReturnArrow className="text-xl" />,
  },
];

export default function ProductAccordion() {
  const [openId, setOpenId] = useState<number | null>();

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-2xl mt-8 mx-auto border-t border-gray-200">
      {accordionData.map((item) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full flex justify-between items-center py-4 px-2 md:px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-left">
              {item.icon}
              <span className="font-semibold">{item.title}</span>
            </div>
            <IoChevronDownSharp
              className={`text-lg transition-transform duration-300 ${
                openId === item.id ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id
                ? "max-h-96 opacity-100 md:p-4"
                : "max-h-0 opacity-0"
            }`}
          >
            {openId === item.id && item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
