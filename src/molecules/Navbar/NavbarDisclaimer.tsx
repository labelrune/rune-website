"use-client";

import React, { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { NavbarDisclaimerData } from "src/constants/NavbarDisclaimer";

const NavbarDisclaimer = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < NavbarDisclaimerData.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : NavbarDisclaimerData.length - 1
    );
  };
  return (
    <div className="bg-[#E0D3BD] w-full h-8 flex items-center justify-between sm:px-28 px-10 sm:py-1 overflow-hidden">
      <GrPrevious className="text-black cursor-pointer" onClick={handlePrev} />
      <div
        key={currentIndex}
        className={`text-black text-sm transition-transform duration-300 ease-in-out ${
          direction === "next"
            ? "animate-slide-in-right"
            : "animate-slide-in-left"
        }`}
      >
        {NavbarDisclaimerData[currentIndex].text}
      </div>
      <GrNext className="text-black cursor-pointer" onClick={handleNext} />
    </div>
  );
};

export default NavbarDisclaimer;
