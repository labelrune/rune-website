"use client"

import { FBProduct } from "src/types/common";
import Dropdown from "../common/Dropdown";
import React, { useMemo, useState } from "react";
import PriceDropdown from "./PriceDropdown";
import Availability from "./Availability";
import { DropdownItem, StockSelection } from "src/types/store";
import Link from "next/link";
import { formatPrice, toKebabCase } from "src/utils/common";

enum SortByEnum {
  FEATURED = "FEATUED",
  A2Z = "A2Z",
  Z2A = "Z2A",
  L2H = "L2H",
  H2L = "H2L",
}

export const SortByOptionsMap: Record<SortByEnum, string> = {
  [SortByEnum.FEATURED]: "Featured",
  [SortByEnum.A2Z]: "Alphabetically, A-Z",
  [SortByEnum.Z2A]: "Alphabetically, Z-A",
  [SortByEnum.L2H]: "Price, low to high",
  [SortByEnum.H2L]: "Price, high to low",
}

function getFirstNetPrice(product: FBProduct): number {
  const firstKey = Object.keys(product.sizes)[0];
  if (!firstKey) return 0;

  const priceString = product.sizes[firstKey].netPrice;
  const priceNumber = parseFloat(priceString);

  return isNaN(priceNumber) ? 0 : priceNumber;
}

const SortingFunctions: Record<SortByEnum, (a: FBProduct, b: FBProduct) => number> = {
  [SortByEnum.FEATURED]: (a: FBProduct, b: FBProduct) => 0, // Keep default order

  [SortByEnum.A2Z]: (a: FBProduct, b: FBProduct) =>
    a.productName.localeCompare(b.productName),

  [SortByEnum.Z2A]: (a: FBProduct, b: FBProduct) =>
    b.productName.localeCompare(a.productName),

  [SortByEnum.L2H]: (a: FBProduct, b: FBProduct) =>
    getFirstNetPrice(a) - getFirstNetPrice(b),

  [SortByEnum.H2L]: (a: FBProduct, b: FBProduct) =>
    getFirstNetPrice(b) - getFirstNetPrice(a),
};

const SortByOptions = Object.entries(SortByOptionsMap).map(([k, v]) => ({ value: k, label: v }));

export default function StoreProducts({ products }: { products: FBProduct[] }) {

  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');

  const [sortBy, setSortBy] = useState<DropdownItem | null>({value: SortByEnum.FEATURED, label: SortByOptionsMap[SortByEnum.FEATURED]});

  const sortedProducts = useMemo(() => {
    if (!sortBy) return products;

    const sortFn = SortingFunctions[sortBy.value as SortByEnum];

    let productsWithinRange = products;

    if (minPriceValue) {
      productsWithinRange = productsWithinRange.filter(product => {
        const productPrice = Number(Object.values(product.sizes)[0].netPrice);
        return productPrice >= Number(minPriceValue);
      });
    }

    if (maxPriceValue) {
      productsWithinRange = productsWithinRange.filter(product => {
        const productPrice = Number(Object.values(product.sizes)[0].netPrice);
        return productPrice <= Number(maxPriceValue);
      });
    }

    return [...productsWithinRange].sort(sortFn);
  }, [products, sortBy, minPriceValue, maxPriceValue]);

  // const [stockSelection, setStockSelection] = useState<StockSelection>({ available: true, soldOut: false });

  const highestPrice = Math.max(...products.map(product => (Number(Object.values(product.sizes)[0].netPrice) ?? 0)));

  return (
    <>
      <div className="mt-8 w-full flex flex-col md:flex-row max-md:gap-4 items-center justify-between">
        <div className="w-full flex flex-row gap-5 max-md:justify-between items-center">
          {/* <div className="flex flex-row gap-5">
            <div>Filter:</div>
            <Availability
              stockSelection={stockSelection}
              setStockSelection={setStockSelection}
              totalSoldOutCount={0}
              totalAvailableCount={products.length}
            />
          </div> */}
          <div className="flex flex-row gap-5">
            <PriceDropdown
              minPriceValue={minPriceValue}
              setMaxPriceValue={setMaxPriceValue}
              maxPriceValue={maxPriceValue ? maxPriceValue : highestPrice.toString()}
              setMinPriceValue={setMinPriceValue}
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center gap-5 md:justify-end max-md:justify-between">
          <div>Sort by:</div>
          <Dropdown
            defaultLabel={SortByEnum.FEATURED}
            preselectFirst
            selectedItem={sortBy}
            setSelectedItem={setSortBy}
            onSelect={setSortBy}
            items={SortByOptions}
          />
          <div>{products.length} products</div>
        </div>
      </div>
      <div className="w-full flex flex-wrap pt-4 gap-4 md:gap-5 justify-start mt-4">
        {
          sortedProducts.map((product, idx) => {
            const { id, productName, imageLinks } = product;
            const { grossPrice, netPrice } = Object.values(product.sizes)[0];
            return (
              <React.Fragment key={id + idx}>
                <Link href={`/product/${id}-${toKebabCase(productName)}`} className="w-[calc(100%/2-8px)] md:w-[calc(100%/3-15px)] h-fit flex flex-col gap-1 md:gap-2 cursor-pointer">
                  <div className="w-full aspect-[2/3] flex justify-center items-center overflow-hidden rounded-sm">
                    <img className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" src={Object.values(imageLinks)[0]} />
                  </div>
                  <div className="hover:underline">{productName}</div>
                  {(netPrice || grossPrice) && (
                    <div className="flex flex-row gap-2 text-lg">
                      <span>MRP</span>
                      <span className="relative max-md:hidden">
                        <span>{grossPrice ? formatPrice(grossPrice) : ""}</span>
                        <span className="absolute inset-0 m-auto w-full max-h-0.5 bg-black" />
                      </span>
                      <span>{netPrice ? formatPrice(netPrice) : ""}</span>
                    </div>
                  )}
                </Link>
              </React.Fragment>
            )
          })
        }
      </div>
    </>
  )
}