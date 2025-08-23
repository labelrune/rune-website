"use-client";

import React, { useEffect, useState } from "react";
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

  // const handlePrev = () => {
  //   setDirection("prev");
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex - 1 >= 0 ? prevIndex - 1 : NavbarDisclaimerData.length - 1
  //   );
  // };

  useEffect(() => {
    setInterval(() => handleNext, 1000);
  }, []);
  return (
    <div className="text-[#FDF7ED] bg-[#293035] w-full h-8 flex items-center justify-center sm:px-28 px-10 sm:py-1 overflow-hidden">
      {/* <GrPrevious className="text-black cursor-pointer" onClick={handlePrev} /> */}
      <div
        key={currentIndex}
        className={`text-sm transition-transform duration-300 ease-in-out ${
          direction === "next"
            ? "animate-slide-in-right"
            : "animate-slide-in-left"
        }`}
      >
        {NavbarDisclaimerData[currentIndex].text}
      </div>
      {/* <GrNext className="text-black cursor-pointer" onClick={handleNext} /> */}
    </div>
  );
};

export default NavbarDisclaimer;
