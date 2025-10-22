"use client";

import { ChangeEvent, ChangeEventHandler, EventHandler, FormEvent, useState } from "react";

export default function MobileNumberForm() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
    setError("");
    setSuccess("");
  };

  const validateNumber = (number:string) => {
    const pattern = /^01[0-9]{9}$/; // Valid Bangladeshi number (11 digits)
    return pattern.test(number);
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mobile) {
      setError("মোবাইল নম্বর লিখুন");
      return;
    }

    if (!validateNumber(mobile)) {
      setError("সঠিক মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)");
      return;
    }

    // If everything is fine
    setError("");
    setSuccess("নম্বরটি সফলভাবে জমা হয়েছে ✅");
    console.log("Submitted Number:", mobile);
  };

  return (
    <div className="py-5 rounded-[8px] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Title */}
        <h1 className="text-2xl font-bold text-[#0A093D] leading-snug mb-8">
          আপনার সঠিক মোবাইল<br />নম্বারটি লিখুন
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Label */}
          <label
            htmlFor="mobileNumber"
            className="block text-left font-medium text-[#0A093D] mb-2"
          >
            রিচার্জ নম্বর
          </label>

          {/* Input */}
          <input
            id="mobileNumber"
            type="text"
            value={mobile}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className={`w-full border ${
              error ? "border-red-400" : "border-gray-200"
            } rounded-xl py-3 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 mb-2`}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#F8B6B6] to-[#F3C2C2] text-[#BF2E2E] font-semibold py-3 rounded-full hover:opacity-90 transition"
          >
            জমা দিন
          </button>
        </form>
      </div>
    </div>
  );
}
