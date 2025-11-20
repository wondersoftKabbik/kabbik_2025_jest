"use client";

import { useAppSelector } from "@/store/store";
import { sponsor_request } from "@/utils/apiServices";
import { useState } from "react";
import Spinner from "../ui/Spinner.view";
import { toast } from "react-toastify";

interface SponsorFormModalProps {
  onClose: () => void;
}

const SponsorFormModal = ({  onClose }: SponsorFormModalProps) => {
  const [loading,setLoading]=useState(false);
  const user=useAppSelector(store=>store.user?.userData);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    productName: "",
    productLink: "",
    details: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.productName.trim()) newErrors.productName = "Product name is required";
    if (!form.productLink.trim()) newErrors.productLink = "Product link is required";
    if (!form.details.trim()) newErrors.details = "Please add company/product details";
    return newErrors;
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true);
      let result=await sponsor_request({
        userId:user?.id??0,
        productName:form.productName,
        companyProductDetails:form.details,
        productLink:form.productLink,
        contactPersonName:form.fullName,
        contactPersonPhone:form.phone,
        contactPersonEmail:form.email
      })
      if(result.affectedRows){
        toast.success("Sponsorship details send to kabbik.com")
      }
      console.log(result,"result")
      onClose();
    }
    setLoading(false);
  };

  return (
      <div className="tiny_scroll_bar">
        <div
          className="profile_btn_gradients  max-h-[95vh] overflow-y-auto text-white rounded-2xl p-6 sm:p-8 shadow-lg 
                    transition-all duration-300"
        >
          {/* Header */}
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-2xl font-semibold leading-snug">
              গল্পের গভীরে থাকুক আপনার ব্রান্ডের ছায়া
            </h2>
            <p className="text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
              Let your brand live within every story. স্পনসর হয়ে আপনার পন্যকে পৌছে দিন
              মিলিয়নস অফ গল্পপ্রেমীর কাছে।
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Product Name */}
            <div>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.productName && (
                <p className="text-red-400 text-xs mt-1">{errors.productName}</p>
              )}
            </div>

            {/* Product Link */}
            <div>
              <input
                type="url"
                name="productLink"
                value={form.productLink}
                onChange={handleChange}
                placeholder="Product Link"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.productLink && (
                <p className="text-red-400 text-xs mt-1">{errors.productLink}</p>
              )}
            </div>

            {/* Company & Product Details */}
            <div>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Company & Product Details"
                rows={4}
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition resize-none"
              />
              {errors.details && (
                <p className="text-red-400 text-xs mt-1">{errors.details}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-[4px] font-semibold bg-white text-[#3A2768]
                        hover:bg-gray-200 transition-all shadow-md"
            >
              {loading?<Spinner size="w-3 h-3"/>:''}
              Submit
            </button>
          </form>
        </div>
      </div>
  );
};

export default SponsorFormModal;
