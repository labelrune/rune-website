"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { testimonials } from "src/constants/Testimonials";
import TestimonialsCard from "./TestimonialsCard";
import { TestimonialCardProps } from "src/types/Testimonials";
import { usePathname } from "next/navigation";

const Testimonials = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10">
      <div className="text-[24px] md:text-[30px] text-black">Our Tribe</div>
      {pathname === "/our-tribe" && (
        <div className="flex items-center justify-center text-center text-sm md:text-[18px] leading-8 text-gray-600 max-w-2xl">
          It warms our heart to see our lovely clients flaunting their beautiful
          pieces from our Label. It brings us emmense pleasure when they tell us
          about the fabric , fit and comfort of our garments . Our community is
          growing and we wish to share some snippets of our journey here.
        </div>
      )}
      <Marquee>
        {testimonials.map((testimonial: TestimonialCardProps) => (
          <div key={testimonial.id} className="flex items-center space-x-4 p-4">
            <TestimonialsCard {...testimonial} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Testimonials;
