import Link from "next/link";
import React from "react";
import { CatalogueLinks } from "src/constants/CatalogueData";
import { getProductsByCollection } from "src/queries/products";
import { CatalogueEnum } from "src/types/Catalogue";
import { FBProduct, SizeChart } from "src/types/common";
import { formatPrice, toKebabCase } from "src/utils/common";

const LabelsData = async ({ catalogue }: { catalogue: CatalogueEnum }) => {
  let filteredCatalogueData: FBProduct[] = [];

  try {
    filteredCatalogueData = (await getProductsByCollection(catalogue)).products;
    console.log("Filtered Catalogue Data:", filteredCatalogueData);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const catalogueText = catalogue;

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-20">
      <div className="flex flex-col items-center gap-1">
        <div className="text-3xl capitalize">{catalogueText}</div>
        <Link
          className="underline underline-offset-4 text-[18px]"
          href={CatalogueLinks[catalogue]}
        >
          View Collection
        </Link>
      </div>
      <div
        className={`flex ${
          filteredCatalogueData.length <= 3 ? "md:justify-center" : ""
        } w-full md:gap-[2%] gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide`}
      >
        {filteredCatalogueData.map((item, index) => {
          return (
            <Link
              className="snap-center flex flex-col gap-2 md:gap-3 group"
              key={index}
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
              <div className="group-hover:underline group-hover:underline-offset-4 capatilize">
                {item.productName}
              </div>
              <div>{`MRP ${formatPrice(
                item.sizes[SizeChart.XS].netPrice
              )}`}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LabelsData;
