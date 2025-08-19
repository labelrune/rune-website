// import React from "react";

// const TermsAndCondition = () => {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-8 md:px-16 mx-auto">
//       <div className="flex flex-col gap-2">
//         <div className="text-[24px] md:text-[30px]">Terms and Conditions</div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           Terms of Services on Shreya Sharma Website and/or Mobile Apps:
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           The terms refer to the Company as a provider for fashion products.
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="font-semibold text-[20px] md:text-[24px]">General</div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           PLEASE READ THE TERMS & CONDITIONS CAREFULLY BEFORE PURCHASING ANY
//           PRODUCTS OR AVAILING ANY SERVICES ON ANY ASSET OF SHREYA SHARMA. ANY
//           PURCHASE MADE BY YOU THROUGH THE WEBSITE OR THROUGH ANY OTHER ASSET
//           SHALL SIGNIFY YOUR ACCEPTANCE OF THE SUPPLY TERMS AND YOUR AGREEMENT
//           TO BE LEGALLY BOUND BY THE SAME. IN ADDITION TO THE FOREGOING, YOU
//           SHALL ALSO BE BOUND BY THE TERMS OF USE OF THE WEBSITE, PRIVACY
//           POLICY, TERMS BY THE VENDOR OR ADDITIONAL TERMS OF SERVICE WHICH ARE
//           DISPLAYED WITH THE SELECTION OF THE PRODUCT, IF ANY ("ADDITIONAL
//           TERMS"). IF THERE IS ANY CONFLICT BETWEEN THE SUPPLY TERMS AND THE
//           ADDITIONAL TERMS, THE ADDITIONAL TERMS SHALL TAKE PRECEDENCE IN
//           RELATION TO THAT SALE.
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           Shreya Sharma reserves the sole right to update or modify these Terms
//           and Conditions at any time without prior notice. For this reason, we
//           encourage you to review these Terms and Conditions every time you
//           purchase products from us or use our website.
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="font-semibold text-[20px] md:text-[24px]">Business</div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           The websites are a platform that facilitate the online sale and
//           purchase of merchandise and services. Shreya Sharma has the right to
//           change or discontinue any service at any time, without notice. Shreya
//           Sharma may add or modify the procedures, modes, processes or
//           conditions of purchase at any time. Shreya Sharma shall not be liable
//           to you or to any third party for any modification, suspension or
//           discontinuance of any aspect of the services.
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="font-semibold text-[20px] md:text-[24px]">Product</div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           Shreya Sharma enables the sale of a variety of products. Shipping for
//           all the products on the website shall be per the company's policy,
//           which may be changed from time to time.
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           We collect information from you when you register on our site, place
//           an order, fill out a form or enter information on our site.
//           Additionally, we collect customer information which is shared with
//           Facebook in an effort to serve more relevant ads and improve our
//           customer experience.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsAndCondition;

import React from "react";

type TermsSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type TermsData = {
  title: string;
  intro?: string[];
  sections: TermsSection[];
};

const defaultTermsData: TermsData = {
  title: "Terms and Conditions",
  intro: [
    "Welcome to Label Rune. These Terms and Conditions (“Terms”) govern your use of our website, mobile application, and services (together, the “Platform”) for browsing and purchasing kurtas, dresses, and related women’s apparel. By using our Platform, you agree to comply with these Terms."
  ],
  sections: [
    {
      heading: "1. Eligibility",
      bullets: [
        "You must be at least 18 years old to place an order.",
        "By accessing our Platform, you confirm that the information you provide is accurate and lawful."
      ]
    },
    {
      heading: "2. Products",
      bullets: [
        "We deal exclusively in women’s clothing, including kurtas and dresses.",
        "Product images are for reference; minor variations in color, fabric, or design may occur.",
        "Availability is subject to stock and may change without notice."
      ]
    },
    {
      heading: "3. Pricing and Payment",
      bullets: [
        "All prices are listed in INR and include applicable taxes unless otherwise stated.",
        "We reserve the right to modify pricing at any time.",
        "Orders are accepted only upon successful payment through approved methods (cards, UPI, wallets, etc.)."
      ]
    },
    {
      heading: "4. Orders and Cancellations",
      bullets: [
        "An order confirmation is sent once payment is received.",
        "We may cancel or refuse orders due to stock issues, errors, or suspected fraud.",
        "Customers may cancel before dispatch; after dispatch, cancellations are not accepted."
      ]
    },
    {
      heading: "5. Shipping and Delivery",
      bullets: [
        "Delivery timelines are estimates and may vary based on location and courier services.",
        "We are not liable for delays beyond our control (logistics disruptions, strikes, etc.).",
        "Risk of loss passes to the customer upon delivery."
      ]
    },
    {
      heading: "6. Returns and Refunds",
      bullets: [
        "Returns/exchanges are accepted only for defective, damaged, or incorrect items.",
        "Requests must be raised within 7 days of receiving the order.",
        "Items must be unused, unwashed, and returned with original tags/packaging.",
        "Refunds (if approved) will be processed within 7–10 working days to the original payment method."
      ]
    },
    {
      heading: "7. Intellectual Property",
      bullets: [
        "All text, images, designs, and content are owned by or licensed to Label Rune.",
        "Unauthorized use, reproduction, or distribution is strictly prohibited."
      ]
    },
    {
      heading: "8. User Responsibilities",
      bullets: [
        "You agree not to engage in fraudulent activity, abuse, or misuse of the Platform.",
        "We reserve the right to suspend or terminate accounts for violations."
      ]
    },
    {
      heading: "9. Limitation of Liability",
      bullets: [
        "We are not liable for indirect, incidental, or consequential damages.",
        "Our liability is limited to the price paid for the product purchased."
      ]
    },
    {
      heading: "10. Governing Law and Jurisdiction",
      bullets: [
        "These Terms are governed by the laws of India.",
        "Any disputes shall be subject to the courts of [Your City, State]."
      ]
    },
    {
      heading: "11. Amendments",
      bullets: [
        "We may revise these Terms at any time. Updates will be effective upon posting on the Platform."
      ]
    }
  ]
};

const TermsAndCondition = () => {
  const terms = defaultTermsData;
  return (
    <div className="flex flex-col gap-4 px-4 py-8 md:px-16 mx-auto">
      <div className="flex flex-col gap-1.5">
        <div className="text-[20px] md:text-[24px] font-medium">{terms.title}</div>
        {terms.intro?.map((p, i) => (
          <div key={`intro-${i}`} className="text-[13px] md:text-[16px] leading-relaxed text-gray-800">
            {p}
          </div>
        ))}
      </div>

      {terms.sections.map((section, idx) => (
        <div key={`section-${idx}`} className="flex flex-col gap-2">
          <div className="font-semibold text-[16px] md:text-[18px]">{section.heading}</div>

          {section.paragraphs?.map((para, j) => (
            <div
              key={`p-${idx}-${j}`}
              className="text-[13px] md:text-[16px] leading-relaxed text-gray-800"
            >
              {para}
            </div>
          ))}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="list-disc pl-5 md:pl-6 space-y-1">
              {section.bullets.map((item, k) => (
                <li
                  key={`b-${idx}-${k}`}
                  className="text-[13px] md:text-[16px] leading-relaxed text-gray-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TermsAndCondition;

