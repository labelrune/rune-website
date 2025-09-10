"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CatalogueLinks } from "src/constants/CatalogueData";
import { CatalogueEnum } from "src/types/Catalogue";
import { FBProduct, SizeChart } from "src/types/common";
import { formatPrice, toKebabCase } from "src/utils/common";

const LabelsClient = ({
  catalogue,
  products,
}: {
  catalogue: CatalogueEnum;
  products: FBProduct[];
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-7 md:mt-20">
      {/* Heading */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-3xl capitalize">{catalogue}</div>
        <Link
          className="underline underline-offset-4 text-[18px]"
          href={CatalogueLinks[catalogue]}
        >
          View Collection
        </Link>
      </motion.div>

      {isMobile ? (
        <motion.div
          className={`flex ${
            products.length <= 3 ? "md:justify-center" : ""
          } w-full md:gap-[2%] gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeIn" }}
        >
          {products.map((item, index) => (
            <Link
              key={index}
              className="snap-center flex flex-col gap-2 md:gap-3 group"
              href={`product/${item.id}-${toKebabCase(item.productName)}`}
            >
              <div className="md:w-[357px] w-[311.3px] md:aspect-[357/618] h-[530px] relative cursor-pointer rounded-sm overflow-hidden">
                <img
                  src={item.imageLinks[1]}
                  alt={item.productName}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                />
                <img
                  src={item.imageLinks[2]}
                  alt={item.productName}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <div className="group-hover:underline group-hover:underline-offset-4 capitalize">
                {item.productName}
              </div>
              <div className="max-sm:text-sm">{`MRP ${formatPrice(
                item.sizes[SizeChart.XS].netPrice
              )}`}</div>
            </Link>
          ))}
        </motion.div>
      ) : (
        <div
          className={`flex ${
            products.length <= 3 ? "md:justify-center" : ""
          } w-full md:gap-[2%] gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide`}
        >
          {products.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeIn",
              }}
            >
              <Link
                className="snap-center flex flex-col gap-2 md:gap-3 group"
                href={`product/${item.id}-${toKebabCase(item.productName)}`}
              >
                <div className="md:w-[357px] w-[311.3px] md:aspect-[357/618] h-[530px] relative cursor-pointer rounded-sm overflow-hidden">
                  <img
                    src={item.imageLinks[1]}
                    alt={item.productName}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                  />
                  <img
                    src={item.imageLinks[2]}
                    alt={item.productName}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
                <div className="group-hover:underline group-hover:underline-offset-4 capitalize">
                  {item.productName}
                </div>
                <div className="max-sm:text-sm">{`MRP ${formatPrice(
                  item.sizes[SizeChart.XS].netPrice
                )}`}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabelsClient;
