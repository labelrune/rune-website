import React from "react";
import { TestimonialCardProps } from "src/types/Testimonials";

const TestimonialsCard = (testimonial: TestimonialCardProps) => {
  const { name, text, image } = testimonial;

  return (
    <div className="flex w-[720px] aspect-[720/560] gap-2">
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="text-4xl text-blue-950">CLIENT TESTIMONIAL</div>
        <div className="text-center text-[16px]">{text}</div>
        <div className="font-bold">{name} 🌸</div>
      </div>
      <img src={image} alt={name} className="w-[360px] h-full object-cover" />
    </div>
  );
};

export default TestimonialsCard;
