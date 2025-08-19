"use client";

import React, { useState } from "react";
import { FBProduct, SizeChart } from "src/types/common";
import { formatPrice } from "src/utils/common";
import ProductAccordion from "../common/ProductAccordian";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { createPortal } from "react-dom";

const MaxQuantity = 9;

export default function ProductInfo({
  productData: product,
  associatedProducts,
}: {
  productData: FBProduct;
  associatedProducts: FBProduct[];
}) {
  const imageLinks = Object.values(product.imageLinks);

  const { productName, description, specification } = product;
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  const sortedSizePrices = Object.fromEntries(
    Object.entries(product.sizes).sort(
      ([keyA], [keyB]) => sizeOrder.indexOf(keyA) - sizeOrder.indexOf(keyB)
    )
  );

  const sizeOptions = product.sizes ? sortedSizePrices : {};

  const [selectedSize, setSelectedSize] = useState(sizeOptions[SizeChart.XS]);

  const [quantity, setQuantity] = useState(1);

  const [imageIndex, setImageIndex] = useState(0);

  const [showChart, setShowChart] = useState(false);
  const [showCm, setShowCm] = useState(false);

  const handleBuyNow = (rawLink: string) => {
    if (typeof window === "undefined") return;

    try {
      const url = new URL(rawLink);
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    } catch {
      console.error("Invalid payment link:", rawLink);
    }
  };
  return (
    <>
      {
        showChart ? createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setShowChart(false)}
          >
            <div
              className="bg-white p-6 rounded shadow-lg max-w-full w-[95vw] md:w-[900px] max-h-[90vh] overflow-y-auto relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="text-xs font-semibold mr-1">in</span>
                <button
                  type="button"
                  className={`cursor-pointer w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${showCm ? "bg-gray-300" : "bg-black/80"}`}
                  onClick={() => setShowCm((prev) => !prev)}
                  aria-label="Toggle cm/in"
                >
                  <span
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${showCm ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span className="text-xs font-semibold ml-1">cm</span>
              </div>
              <button
                className="cursor-pointer absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black"
                onClick={() => setShowChart(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mt-12">
                <div className="text-xl font-bold mb-2">
                  SIZE CHART &#123;Top/Kurti/Tunic/Dresses&#125;
                </div>
                <div className="mb-4 text-sm text-gray-600">
                  Below Measurement is Body Measurement Size ({showCm ? "cm" : "in"})
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-center text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1"> </th>
                        <th className="border px-2 py-1">XS</th>
                        <th className="border px-2 py-1">S</th>
                        <th className="border px-2 py-1">M</th>
                        <th className="border px-2 py-1">L</th>
                        <th className="border px-2 py-1">XL</th>
                        <th className="border px-2 py-1">XXL</th>
                        <th className="border px-2 py-1">3XL</th>
                        <th className="border px-2 py-1">4XL</th>
                        <th className="border px-2 py-1">5XL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Bust", in: [32, 34, 36, 38, 40, 42, 44, 46, 48], cm: [81.3, 86.4, 91.4, 96.5, 101.6, 106.7, 111.8, 116.8, 121.9] },
                        { label: "Waist", in: [25, 27, 29, 31, 33, 35, 37, 39, 41], cm: [63.5, 68.6, 73.7, 78.7, 83.8, 88.9, 94.0, 99.1, 104.1] },
                        { label: "Hip", in: [36, 38, 40, 42, 44, 46, 48, 50, 52], cm: [91.4, 96.5, 101.6, 106.7, 111.8, 116.8, 121.9, 127.0, 132.1] },
                        { label: "Shoulder", in: [13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5], cm: [34.3, 35.6, 36.8, 38.1, 39.4, 40.6, 41.9, 43.2, 44.5] },
                        { label: "Length", in: [26, 26, 26, 26, 26, 26, 26, 26, 26], cm: [66.0, 66.0, 66.0, 66.0, 66.0, 66.0, 66.0, 66.0, 66.0] },
                        { label: "Armhole", in: [17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5], cm: [44.5, 45.7, 47.0, 48.3, 49.5, 50.8, 52.1, 53.3, 54.6] },
                      ].map(row => (
                        <tr key={row.label}>
                          <td className="border px-2 py-1 font-semibold">{row.label}</td>
                          {(showCm ? row.cm : row.in).map((val, i) => (
                            <td className="border px-2 py-1" key={i}>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-xl font-bold mt-8 mb-2">
                  SIZE CHART &#123;Pants/Shorts&#125;
                </div>
                <div className="mb-4 text-sm text-gray-600">
                  Below Measurement is Body Measurement Size ({showCm ? "cm" : "in"})
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 text-center text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-2 py-1"> </th>
                        <th className="border px-2 py-1">XS</th>
                        <th className="border px-2 py-1">S</th>
                        <th className="border px-2 py-1">M</th>
                        <th className="border px-2 py-1">L</th>
                        <th className="border px-2 py-1">XL</th>
                        <th className="border px-2 py-1">XXL</th>
                        <th className="border px-2 py-1">3XL</th>
                        <th className="border px-2 py-1">4XL</th>
                        <th className="border px-2 py-1">5XL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Length", in: [37, 37, 37, 37, 37, 37, 37, 37, 37], cm: [94.0, 94.0, 94.0, 94.0, 94.0, 94.0, 94.0, 94.0, 94.0] },
                        { label: "Waist", in: [25, 27, 29, 31, 33, 35, 37, 39, 41], cm: [63.5, 68.6, 73.7, 78.7, 83.8, 88.9, 94.0, 99.1, 104.1] },
                        { label: "Hip", in: [36, 38, 40, 42, 44, 46, 48, 50, 52], cm: [91.4, 96.5, 101.6, 106.7, 111.8, 116.8, 121.9, 127.0, 132.1] },
                      ].map(row => (
                        <tr key={row.label}>
                          <td className="border px-2 py-1 font-semibold">{row.label}</td>
                          {(showCm ? row.cm : row.in).map((val, i) => (
                            <td className="border px-2 py-1" key={i}>{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>,
          document.body
        ) : null
      }
      <div className="w-full flex flex-col md:flex-row gap-5 md:gap-16 items-start">
        <div className="max-md:flex-1 md:w-full flex flex-col">
          <Carousel
            axis="horizontal"
            infiniteLoop
            interval={2500}
            transitionTime={1000}
            className="w-full aspect-[2/3] flex flex-row justify-center items-center"
            showIndicators={false}
            showThumbs={false}
            selectedItem={imageIndex}
            onChange={setImageIndex}
            showArrows
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  onClick={onClickHandler}
                  title={label}
                  className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10 hover:bg-black/80"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  onClick={onClickHandler}
                  title={label}
                  className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10 hover:bg-black/80"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              )
            }
          >
            {
              imageLinks.map(link => (
                <img
                  key={link}
                  src={link}
                  className="aspect-[2/3] bg-red-300 h-full"
                />
              ))
            }
          </Carousel>
          <div className="mt-2 flex flex-row gap-1.5">
            {imageLinks.map((imageLink, idx) => {
              const isSelectedImage = idx === imageIndex;
              const updateIndex = () => setImageIndex(idx);
              return (
                <div
                  key={imageLink}
                  onClick={updateIndex}
                  className="flex-1 aspect-[2/3] cursor-pointer overflow-hidden"
                >
                  <img
                    src={imageLink}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-md:flex-1 md:w-full flex flex-col justify-start gap-3">
          <div className="text-4xl">{productName}</div>
          {selectedSize.grossPrice !== "" && (
            <div className="text-xl mt-4 line-through">
              MRP ₹ {formatPrice(selectedSize.grossPrice)}
            </div>
          )}
          {selectedSize.netPrice !== "" && (
            <div className="text-xl">MRP ₹ {selectedSize.netPrice}</div>
          )}
          {/* <div>Tax included. Shipping calculated at checkout.</div>
          Instead, we will add a short description */}
          {Object.keys(sizeOptions).length ? (
            <div className="flex flex-row justify-between items-center w-full mt-4">
              {/* <div>Size</div> */}
              <div className="">*No hidden charges. Select your size at checkout.</div>
              <div onClick={() => setShowChart(true)} className="font-semibold underline cursor-pointer">
                Size Chart
              </div>
            </div>
          ) : null}
          {/* <div className="flex flex-row flex-wrap gap-3">
            {Object.keys(sizeOptions).map((size) => (
              <div
                key={size}
                className={`
                  rounded-full w-fit px-7 py-2 border-1 border-black
                  ${selectedSize === sizeOptions[size] && "bg-black text-white"}
                  transition-colors cursor-pointer duration-300
                `}
                onClick={() => setSelectedSize(sizeOptions[size])}
              >
                {size}
              </div>
            ))}
          </div> */}
          {/* <div className="mt-4">Quantity</div>
          <div className="flex flex-row justify-around gap-8 border-black border px-6 py-3 text-xl w-fit">
            <div
              className={`scale-x-150 select-none ${quantity === 1
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
                }`}
              onClick={() => setQuantity((x) => Math.max(x - 1, 1))}
            >
              -
            </div>
            <div>{quantity}</div>
            <div
              className={`select-none ${quantity === 9
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
                }`}
              onClick={() => setQuantity((x) => Math.min(x + 1, MaxQuantity))}
            >
              +
            </div>
          </div> */}
          {/* <div className="flex justify-center items-center border-black border-2 py-4 cursor-pointer text-xl hover:border-4 hover:mt-3 hover:translate-y-0.5 mt-4">
            Add to Cart
          </div> */}
          <div onClick={() => handleBuyNow(selectedSize.paymentLink)} className="flex transition-all rounded-md justify-center items-center text-[#FDF7ED] hover:opacity-90 bg-[#293035] py-4 cursor-pointer text-xl mt-8">
            BUY NOW
          </div>
          <div className="mt-8 text-lg">{description}</div>
          {specification.map(({ key, value }) => (
            <div className="flex flex-row mt-2 text-xl" key={key}>
              <div className="font-semibold">{key}</div>
              <div className="uppercase">: {value}</div>
            </div>
          ))}
          <div>
            <ProductAccordion />
          </div>
        </div>
      </div>
      <div className="flex flex-col my-16 gap-12 justify-center items-center w-full">
        <div className="text-3xl">You may also like</div>
        <div className="flex flex-row flex-wrap gap-4 justify-center items-center w-full">
          {associatedProducts.map((product, index) => {
            const { productName, sizes } = product;
            const imageLinks = Object.values(product.imageLinks);
            const imagesCount = imageLinks.length;
            const randomIndex =
              Math.round(Math.random() * imagesCount + 1.01) % imagesCount;
            return (
              <div
                className="snap-center flex flex-col gap-2 md:gap-3 group w-[calc(100%/2-12px)] md:w-[calc(100%/4-12px)]"
                key={index}
              >
                <div className="aspect-[7/6] overflow-hidden md:aspect-[357/618] w-full relative cursor-pointer rounded-sm">
                  <img
                    src={imageLinks[randomIndex]}
                    alt={productName}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                  />
                  <img
                    src={imageLinks[(randomIndex + 1) % imagesCount]}
                    alt={productName}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
                <div className="group-hover:underline group-hover:underline-offset-4 capatilize cursor-pointer">
                  {productName}
                </div>
                {sizes[SizeChart.XS].netPrice && (
                  <div className="flex gap-2 items-center">
                    {sizes[SizeChart.XS].grossPrice && (
                      <span className="line-through">{`MRP ${formatPrice(
                        sizes[SizeChart.XS].grossPrice
                      )}`}</span>
                    )}
                    <span>{`MRP ${formatPrice(
                      sizes[SizeChart.XS].netPrice
                    )}`}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
