import Link from "next/link";
import React from "react";
import { CatalogueData, CatalogueLinks } from "src/constants/CatalogueData";
import { CatalogueEnum } from "src/types/Catalogue";
import { formatPrice, toKebabCase } from "src/utils/common";

const LabelsData = ({ catalogue }: { catalogue: CatalogueEnum }) => {

  const filteredCatalogueData = CatalogueData.filter(
    (item) => item.id === catalogue
  );

  const catalogueText = catalogue;
  // catalouge === Catalogue.Gulzaar
  //   ? "Gulzaar"
  //   : catalouge === Catalogue.SpringSummer
  //     ? "Spring Summer"
  //     : catalouge === Catalogue.FestiveStyles
  //       ? "Festive Styles"
  //       : catalouge === Catalogue.BloomAndBreeze
  //         ? "Bloom and Breeze"
  //         : catalouge === Catalogue.VelvetAndTissueEdit
  //           ? "Velvet and Tissue Edit"
  //           : "Bestsellers";

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
      <div className="flex w-full md:gap-[2%] gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {filteredCatalogueData.map((item, index) => {
          return (
            <Link
              className="snap-center flex flex-col gap-2 md:gap-3 group"
              key={index}
              href={`${item.link}-${toKebabCase(item.title)}`}
            >
              <div className="md:w-[357px] w-[311.3px] md:aspect-[357/618] h-[530px] relative cursor-pointer rounded-sm overflow-hidden">
                <img
                  src={item.imageUrl[0]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                />
                <img
                  src={item.imageUrl[1]}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>
              <div className="group-hover:underline group-hover:underline-offset-4 capatilize">
                {item.title}
              </div>
              <div>{`MRP ${formatPrice(item.price)}`}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LabelsData;
