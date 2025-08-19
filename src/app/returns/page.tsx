import React from "react";

const Returns = () => {
  return (
    <div className="flex flex-col gap-3 px-4 py-8 md:px-16 mx-auto">
      <div className="flex flex-col gap-2">
        <div className="text-[24px] md:text-[30px]">Return Policy</div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          We want you to cherish your purchase, and if you have any concerns,
          please don’t hesitate to reach out. Every garment is made to order,
          crafted with time, care, and attention to detail.
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-[20px] md:text-[24px]">
          Once your order is confirmed, we do not offer refunds. Exchanges are
          only possible if:
        </div>
        <div className="text-[14px] md:text-[18px] text-gray-800">
          <ul>
            <li>● The delivered item does not match your order.</li>
            <li>● The product has a manufacturing defect.</li>
            <li>● The size delivered is incorrect.</li>
          </ul>
        </div>
      </div>

      <div className="text-[14px] md:text-[18px] text-gray-800">
        Alterations or replacements will be processed once the return is
        approved, and the new piece will be dispatched within 15 days of
        approval.
      </div>
    </div>
  );
};

export default Returns;
