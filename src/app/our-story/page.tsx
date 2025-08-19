import React from "react";

const OurStory = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-10 items-center">
      <div className="md:w-[1300px]">
        <img
          src="https://i.ibb.co/RGV1QyBN/2.webp"
          alt="our-stroy"
          className="object-cover w-full max-sm:h-[270px]  md:aspect-[1300/1095]"
        />
        <div className="flex max-sm:flex-col md:justify-between mt-5">
          <div className="md:w-[50%] text-[30px] leading-[39px]">
            RUNE speaks in whispers of elegance.
          </div>
          <div className="flex flex-col gap-3 md:w-[50%] text-[16px] leading-[28px] text-black opacity-75">
            <div>
              Crafted in hand-woven fabrics and gentle embroidery, each piece is
              made with purpose, for those who find beauty in the quiet and the
              crafted.
            </div>
            <div>
              We believe in the art of less, where every weave, every detail,
              and every finish is intentional, with no compromise on quality or
              craft.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
