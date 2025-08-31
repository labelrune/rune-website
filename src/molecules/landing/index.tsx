"use client";

import React, { useRef, useEffect, useState } from "react";
import { LandingImages } from "src/constants/Landing";
import Image from "next/image";

const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalSlides, setTotalSlides] = useState(LandingImages.length);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setTotalSlides(4);
    }
  }, []);

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
      className="aspect-[1/2] md:aspect-[1520/646] w-screen overflow-x-auto snap-x snap-mandatory flex scroll-smooth scrollbar-hide"
    >
      {LandingImages.map((item) => (
        <div className={`min-w-full h-full snap-start`} key={item.id}>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover hidden md:block"
          />
          <Image
            src={item.src_mobile}     // remote WebP from your S3 bucket
            alt={item.alt}
            width={800}               // pick realistic max display width
            height={600}              // preserve aspect ratio
            priority                  // preload + high fetchpriority
            placeholder="blur"        // blur-up while decoding
            sizes="(max-width:768px) 100vw"          // tell browser how wide it will render
            className="w-full h-full object-cover block md:hidden"
          />
        </div>
      ))}
    </div>
  );
};

export default Landing;
