"use client";

import React, { useRef, useEffect, useState } from "react";
import { LandingImages } from "src/constants/Landing";

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = LandingImages.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      setCurrentSlide(nextSlide);

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: containerRef.current.offsetWidth * nextSlide,
          behavior: "smooth",
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div
      ref={containerRef}
      className="aspect-[1520/646] w-screen overflow-x-auto snap-x snap-mandatory flex scroll-smooth scrollbar-hide"
    >
      {LandingImages.map((item) => (
        <div className={`min-w-full h-full snap-start`} key={item.id}>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Landing;
