import React from "react";

const ShippingPolicy = () => {
  return (
    <section className="px-4 py-8 md:px-16 mx-auto">
      <h2 className="text-3xl font-serif mb-6">Shipping Policy</h2>
      <ul className="space-y-4 list-disc list-inside text-base leading-relaxed text-[14px] md:text-[16px] text-gray-800">
        <li>Free domestic shipping on all orders pan-India.</li>
        <li>We ship all our goods through trusted service providers.</li>
        <li>
          Since our pieces are made-to-order, they will be delivered within
          10–12 working days for domestic orders. For international orders, it
          would be delivered in 15 working days. Sundays and public holidays
          might lead to a change in the order delivery timeline by a few days.
        </li>
        <li>
          Shipping address change has to be notified to us within 24 hours of
          placing the order by sending us an email on{" "}
          <a
            href="mailto:reachus@labelrune.com"
            className="text-blue-600 underline"
          >
            reachus@labelrune.com
          </a>{" "}
          with the order number.
        </li>
      </ul>
    </section>
  );
};

export default ShippingPolicy;
