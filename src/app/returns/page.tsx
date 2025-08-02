import React from "react";

const Returns = () => {
  return (
    <div className="flex flex-col gap-3 px-4 py-8 md:px-16 mx-auto">
      <div className="flex flex-col gap-2">
        <div className="text-[24px] md:text-[30px]">Return Policy</div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          As an organisation, we believe in 100% customer satisfaction.
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-[20px] md:text-[24px]">
          All our pieces are made-to-order with a lot of time and attention. In
          case of any issue with the piece, please follow our policy below for
          exchange. <span className="font-bold">No Refund only Exchange</span>{" "}
          if it meets the following criteria :
        </div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          <ul>
            <li>
              The product must be unworn, unwashed, and in its original
              condition with all tags attached.
            </li>
            <li>
              The return request must be initiated within 7 days of receiving
              the product.
            </li>
            <li>
              The product must not be a sale item or a custom-made piece, as
              these are non-returnable.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-[20px] md:text-[24px]">
          To be eligible for an exchange, your item must be unused, unwashed and
          in the same condition that you received it. It must also be in the
          original packaging and all the tags and bar codes, invoice slips are
          intact at the time of return. Damaged, defective, or incorrect items
          must be reported within 7 days of delivery. To complete your exchange,
          please email us at labelshreyasharma@gmail.com within 48 hours of
          delivery with the following information:
        </div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          <ul>
            <li>Order number</li>
            <li>Product name</li>
            <li>Reason for exchange</li>
            <li>Photographs of the product</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-[20px] md:text-[24px]">Product</div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          Shreya Sharma enables the sale of a variety of products. Shipping for
          all the products on the website shall be per the company's policy,
          which may be changed from time to time.
        </div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          We collect information from you when you register on our site, place
          an order, fill out a form or enter information on our site.
          Additionally, we collect customer information which is shared with
          Facebook in an effort to serve more relevant ads and improve our
          customer experience.
        </div>
      </div>
    </div>
  );
};

export default Returns;
