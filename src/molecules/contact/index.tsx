"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?\d{7,15}$/, "Enter a valid phone number")
    .notRequired(),
  comment: Yup.string()
    .min(10, "Please enter at least 10 characters")
    .required("Comment is required"),
});

export const ContactForm = () => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting", values);
      resetForm();
    },
  });

  return (
    <section className="flex flex-col lg:flex-row items-start justify-center px-4 py-12 gap-12 w-full">
      <div className="w-full lg:w-1/2">
        <div className="text-3xl md:text-4xl font-serif mb-4">Get in touch</div>
        <div className="mb-8 text-gray-700 text-[16px] max-w-md">
          Reach out to us anytime. We’re here to answer your questions promptly.
        </div>
        <div className="space-y-4">
          <p className="text-[16px]">
            <span className="font-bold">Phone:</span> +91 9008255433
          </p>
          <p className="text-[16px]">
            <span className="font-bold">Email:</span> reachus@labelrune.com
          </p>
          <p className="text-[16px]">
            <span className="font-bold">Address:</span> 213, 1st Main Rd, 7th Block, Koramangala, Bengaluru, Karnataka 560030
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={`w-full border px-4 py-2 ${touched.name && errors.name
                    ? "border-red-500"
                    : "border-black"
                  }`}
              />
              {touched.name && errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={`w-full border px-4 py-2 ${touched.email && errors.email
                    ? "border-red-500"
                    : "border-black"
                  }`}
              />
              {touched.email && errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              className={`w-full border px-4 py-2 ${touched.phone && errors.phone
                  ? "border-red-500"
                  : "border-black"
                }`}
            />
            {touched.phone && errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <textarea
              name="comment"
              placeholder="Comment"
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.comment}
              className={`w-full border px-4 py-2 resize-none ${touched.comment && errors.comment
                  ? "border-red-500"
                  : "border-black"
                }`}
            />
            {touched.comment && errors.comment && (
              <p className="text-red-600 text-sm mt-1">{errors.comment}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 bg-black text-white py-3 uppercase tracking-wide hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
