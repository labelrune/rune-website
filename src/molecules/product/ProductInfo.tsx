"use client";

import React, { useEffect, useRef, useState } from "react";
import { FBProduct, SizeChart } from "src/types/common";
import { formatPrice } from "src/utils/common";
import ProductAccordion from "../common/ProductAccordian";
import { load as loadCashfree } from "@cashfreepayments/cashfree-js";
const MaxQuantity = 9;
const CF_MODE =
  process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
    ? "production"
    : "sandbox";

const hashString = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

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
  const [isPaying, setIsPaying] = useState(false);
  const cashfreeRef = useRef<Awaited<ReturnType<typeof loadCashfree>> | null>(null);

  useEffect(() => {
    let done = false;
    loadCashfree({ mode: CF_MODE })
      .then((sdk) => {
        if (!done) cashfreeRef.current = sdk;
      })
      .catch((e) => console.error("Cashfree SDK load failed", e));
    return () => {
      done = true;
    };
  }, []);

  const handleBuyNow = async () => {
    try {
      setIsPaying(true);

      const unit =
        Number(selectedSize?.netPrice || selectedSize?.grossPrice || 0) || 0;
      const orderAmount = Number((unit * quantity).toFixed(2));
      if (!orderAmount) {
        alert("Price is unavailable for the selected size.");
        return;
      }

      const orderId = `rune_${Date.now()}`;
      const res = await fetch("/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          order_id: orderId,
          order_amount: orderAmount,
          customer_id: "guest",
          customer_phone: "9999999999",
        }),
      });

      const json = await res.json();
      if (!json?.success) {
        throw new Error(json?.message || "Failed to create order");
      }

      const sessionId = json.data?.payment_session_id as string | undefined;
      if (!sessionId) throw new Error("Missing payment_session_id");

      const cashfree = cashfreeRef.current;
      if (!cashfree) throw new Error("Cashfree SDK not ready");

      await cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
        onSuccess: (data: any) => {
          console.log("Payment success:", data);
          fetch("/api/payment-tracking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "success", orderId, data }),
          });
        },
        onFailure: (data: any) => {
          console.error("Payment failed:", data);

          fetch("/api/payment-tracking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "failed", orderId, data }),
          });
        },
        onCancelled: () => {
          console.warn("Payment cancelled by user");

          fetch("/api/payment-tracking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "cancelled", orderId }),
          });
        },
      });
    } catch (err: any) {
      console.error("Payment start error:", err);
      alert(err?.message || "Failed to start payment");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-5 md:gap-16 items-start">
        <div className="max-md:flex-1 md:w-full flex flex-col">
          <div className="w-full aspect-[2/3]">
            <img
              src={imageLinks[imageIndex]}
              className="w-full h-full object-cover"
            />
          </div>
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
            <div className="flex flex-row justify-between w-full mt-4">
              <div>Size</div>
              <div className="font-semibold underline cursor-pointer">
                Size Chart
              </div>
            </div>
          ) : null}
          <div className="flex flex-row flex-wrap gap-3">
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
          </div>
          <div className="mt-4">Quantity</div>
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
          </div>
          {/* <div className="flex justify-center items-center border-black border-2 py-4 cursor-pointer text-xl hover:border-4 hover:mt-3 hover:translate-y-0.5 mt-4">
            Add to Cart
          </div> */}
          <button  onClick={handleBuyNow} disabled={isPaying} className="flex justify-center items-center hover:text-white bg-[#E0D3BD] py-4 cursor-pointer text-xl mt-4">
            Buy now
          </button>
          <div className="mt-4 text-lg text-balance">{description}</div>
          {specification.map(({ key, value }) => (
            <div className="flex flex-row mt-1 text-xl" key={key}>
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
