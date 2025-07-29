"use client";

import React, { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { testimonials } from "src/constants/Testimonials";
import TestimonialsCard from "./TestimonialsCard";
import { TestimonialCardProps } from "src/types/Testimonials";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-[30px] text-black">Our Tribe</div>
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
