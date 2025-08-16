"use client";

import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
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
    title: "Care Instructions",
    content: (
      <div className="space-y-1 text-gray-700">
        <p>Hand wash in cold water. Do not bleach. Dry in shade.</p>
      </div>
    ),
    icon: <FaRegHeart className="text-xl" />,
  },
];

export default function ProductAccordion() {
  const [openId, setOpenId] = useState<number | null>();

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto border-t border-gray-200">
      {accordionData.map((item) => (
        <div key={item.id} className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full flex justify-between items-center py-4 px-2 md:px-4"
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
                ? "max-h-96 opacity-100 p-2 md:p-4"
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
