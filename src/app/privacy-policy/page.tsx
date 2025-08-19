// import React from "react";

// const PrivacyPolicy = () => {
//   return (
//     <div className="flex flex-col gap-3 px-4 py-8 md:px-16 mx-auto">
//       <div className="flex flex-col gap-2">
//         <div className="text-[24px] md:text-[30px]">Privacy Policy</div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           We value the trust you place in us. That's why we insist upon the
//           highest standards for secure transactions and customer information
//           privacy. Please read the following statement to learn about our
//           information gathering and dissemination practices.
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           By visiting this website you agree to be bound by the terms and
//           conditions of this Privacy Policy. If you do not agree, please do not
//           use or access our website.
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="font-semibold text-[20px] md:text-[24px]">
//           Collection and Use of Information
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           When you purchase something from our store, as part of the buying and
//           selling process, you may be asked to enter your name, email address,
//           mailing address, phone number, credit card information or other
//           details to help you with your experience.
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           We collect information from you when you register on our site, place
//           an order, fill out a form or enter information on our site.
//           Additionally, we collect customer information which is shared with
//           Facebook in an effort to serve more relevant ads and improve our
//           customer experience.
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="font-semibold text-[20px] md:text-[24px]">
//           Collection and Use of Information
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           When you purchase something from our store, as part of the buying and
//           selling process, you may be asked to enter your name, email address,
//           mailing address, phone number, credit card information or other
//           details to help you with your experience.
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           We collect information from you when you register on our site, place
//           an order, fill out a form or enter information on our site.
//           Additionally, we collect customer information which is shared with
//           Facebook in an effort to serve more relevant ads and improve our
//           customer experience.
//         </div>
//       </div>
//       <div className="flex flex-col gap-2">
//         <div className="font-semibold text-[20px] md:text-[24px]">
//           Collection and Use of Information
//         </div>
//         <div className="text-[14px] md:text-[18px] text-gray-800">
//           When you purchase something from our store, as part of the buying and
//           selling process, you may be asked to enter your name, email address,
//           mailing address, phone number, credit card information or other
//           details to help you with your experience.
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

// export default PrivacyPolicy;

import React from "react";

type PolicySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type ContactInfo = {
  email: string;
  phone: string;
  address: string;
};

type PolicyData = {
  title: string;
  effectiveDate?: string;
  intro?: string[];
  sections: PolicySection[];
  contact?: ContactInfo;
};

const defaultPolicyData: PolicyData = {
  title: "Privacy Policy",
  effectiveDate: "Effective Date: August 19, 2025",
  intro: [
    "This Privacy Policy describes how Label Rune (“we”, “our”, “us”) collects, uses, and protects your personal information when you access or use our website, mobile application, and services (together, the “Platform”). By using the Platform, you consent to the practices described in this Policy."
  ],
  sections: [
    {
      heading: "1. Information We Collect",
      bullets: [
        "Personal Information: Name, email address, phone number, billing/shipping address, and payment details when you place an order.",
        "Non-Personal Information: Browser type, device information, IP address, and usage data collected automatically.",
        "Cookies: Small files stored on your device to improve site functionality, preferences, and shopping experience."
      ]
    },
    {
      heading: "2. How We Use Your Information",
      bullets: [
        "To process and fulfill your orders.",
        "To communicate order updates, offers, and customer support.",
        "To improve our products, services, and user experience.",
        "To comply with legal and regulatory obligations."
      ]
    },
    {
      heading: "3. Sharing of Information",
      bullets: [
        "We do not sell or rent your personal data.",
        "Information may be shared with trusted third parties (payment processors, courier partners, IT service providers) strictly for business operations.",
        "We may disclose information when required by law or to protect our rights and security."
      ]
    },
    {
      heading: "4. Data Security",
      bullets: [
        "We use reasonable security measures to protect your data against unauthorized access, alteration, or disclosure.",
        "However, no method of transmission over the Internet or storage is fully secure, and we cannot guarantee absolute security."
      ]
    },
    {
      heading: "5. Your Rights",
      bullets: [
        "You may request access, correction, or deletion of your personal data by contacting us.",
        "You can opt out of marketing communications by using the unsubscribe option in emails or contacting our support."
      ]
    },
    {
      heading: "6. Data Retention",
      bullets: [
        "We retain personal data only as long as necessary for business, legal, or regulatory requirements."
      ]
    },
    {
      heading: "7. Third-Party Links",
      bullets: [
        "Our Platform may contain links to third-party websites. We are not responsible for their privacy practices."
      ]
    },
    {
      heading: "8. Children’s Privacy",
      bullets: [
        "We do not knowingly collect personal data from children under 18. If we discover such data, it will be deleted immediately."
      ]
    },
    {
      heading: "9. Changes to this Policy",
      bullets: [
        "We may update this Privacy Policy from time to time. Changes will be effective upon posting on the Platform."
      ]
    },
    {
      heading: "10. Contact Us",
      bullets: [
        "For privacy-related questions or requests, please contact:",
        "Email: support@labelrune.com",
        "Phone: +91-XXXXXXXXXX",
        "Address: Your Company Address"
      ]
    }
  ]
};

const PrivacyPolicy: React.FC<{ policy?: PolicyData }> = ({ policy = defaultPolicyData }) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 md:px-16 mx-auto">
      <div className="flex flex-col gap-1.5">
        <div className="text-[20px] md:text-[24px] font-medium">{policy.title}</div>
        {policy.effectiveDate && (
          <div className="text-[12px] md:text-[14px] text-gray-700">{policy.effectiveDate}</div>
        )}
        {policy.intro?.map((p, i) => (
          <div key={`intro-${i}`} className="text-[13px] md:text-[16px] leading-relaxed text-gray-800">
            {p}
          </div>
        ))}
      </div>

      {policy.sections.map((section, idx) => (
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

export default PrivacyPolicy;
