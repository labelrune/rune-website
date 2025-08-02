"use client"

import { FBProduct } from "src/types/common";
import Dropdown from "../common/Dropdown";
import React, { useState } from "react";
import PriceDropdown from "./PriceDropdown";
import Availability from "./Availability";
import { StockSelection } from "src/types/store";
import Link from "next/link";

const SortByOptionsMap: Record<string, string> = {
  FEATURED: "Featured",
  BEST_SELLING: "Best selling",
  A2Z: "Alphabetically, A-Z",
  Z2A: "Alphabetically, Z-A",
  L2H: "Price, low to high",
  H2L: "Price, high to low",
  O2N: "Date, old to new",
  N2O: "Date, new to old",
}

function toKebabCase(input: string): string {
  return input
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .replace(/\s/g, '-')
    .trim();
}

const SortByOptions = Object.entries(SortByOptionsMap).map(([k, v]) => ({ value: k, label: v }));

export default function StoreProducts({ products: tempProducts }: { products: FBProduct[] }) {

  const products = [...tempProducts, ...tempProducts, ...tempProducts];

  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');

  const [stockSelection, setStockSelection] = useState<StockSelection>({ available: true, soldOut: false });

  const highestPrice = Math.max(...products.map(product => product.basePrice));

  return (
    <>
      <div className="mt-8 w-full flex flex-row items-center justify-between">
        <div className="flex flex-row gap-5 items-center">
          <div>Filter:</div>
          <Availability
            stockSelection={stockSelection}
            setStockSelection={setStockSelection}
            totalSoldOutCount={0}
            totalAvailableCount={products.length}
          />
          <PriceDropdown
            minPriceValue={minPriceValue}
            setMaxPriceValue={setMaxPriceValue}
            maxPriceValue={highestPrice.toString()}
            setMinPriceValue={setMinPriceValue}
          />
        </div>
        <div className="flex flex-row items-center gap-5">
          <div>Sort by:</div>
          <Dropdown
            defaultLabel=""
            preselectFirst
            onSelect={() => { }}
            items={SortByOptions}
          />
          <div>{products.length} products</div>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-2 md:gap-5 justify-between mt-4">
        {
          products.map((product, idx) => {
            const { id, productName, imageLinks, basePrice, cutPrice } = product;
            return (
              <React.Fragment key={id + idx}>
                <Link href={`/product/${id}-${toKebabCase(productName)}`} className="w-[calc(100%/2-8px)] md:w-[calc(100%/3-15px)] h-fit flex flex-col gap-2 cursor-pointer">
                  <div className="w-full aspect-[2/3] flex justify-center items-center overflow-hidden rounded-sm">
                    <img className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" src={imageLinks["0"]} />
                  </div>
                  <div className="hover:underline">{productName}</div>
                  <div className="flex flex-row gap-2 text-lg">
                    <span>MRP</span>
                    <span className="relative">
                      <span>₹ {cutPrice}</span>
                      <span className="absolute inset-0 m-auto w-full max-h-0.5 bg-black" />
                    </span>
                    <span>₹ {basePrice}</span>
                  </div>
                </Link>
              </React.Fragment>
            )
          })
        }
      </div>
    </>
  )
}