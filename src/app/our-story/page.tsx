import React from "react";

const OurStory = () => {
  return (
    <div className="p-5 md:p-10 flex flex-col gap-10 items-center">
      <div className="md:w-[1300px]">
        <img
          src="https://cdn.shopify.com/s/files/1/0590/4023/5564/files/crop.jpg?v=1666175336"
          alt="our-stroy"
          className="object-cover w-full max-sm:h-[270px]  md:aspect-[1300/1095]"
        />
        <div className="flex max-sm:flex-col md:justify-between mt-5">
          <div className="md:w-[50%] text-[30px] leading-[39px]">
            Made with love in India.
          </div>
          <div className="flex flex-col gap-3 md:w-[50%] text-[16px] leading-[28px] text-black opacity-75">
            <div>
              I always wondered how my Dadi used to walk into a room full of
              ladies, wearing the most subtle garment from her limited wardrobe
              and still used to be the centre of attraction for all. Donned in a
              simple seedha palla white kota saree she always managed to steal
              the show. Took me few years to understand that it was partly
              because of her personality and partly because she always believed
              in the magic of simplicity. She unknowingly taught me that style
              need not be loud or over the top. Less is more. While fashion is
              ever changing and transitory, Style is permanent and unique for
              each one of us.
            </div>
            <div>
              At label Shreya Sharma we are dedicated to making garments in luxe
              fabrics and in relaxed comfortable fits. Subtlety in prints and
              embroidery with an eye for detail is our key.
            </div>
            <div>
              The brand is all about myriad colours , uplifting prints and
              delicate embroideries. Pieces which can easily translate from
              day-to-evening. Silhouettes that are designed keeping in mind
              every body type. The brand is synonymous with effortless style.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
