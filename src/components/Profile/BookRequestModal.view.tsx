"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import { toast } from "react-toastify";
import { postBookRequest } from "@/utils/apiServices";
import { Languages } from "lucide-react";
import Spinner from "../ui/Spinner.view";

const BookInfoForm = ({onclose}:{onclose:()=>void}) => {
  const [loading,setLoading]=useState(false);
  const [errors, setErrors] = useState({
    name: "",
    bookName: "",
    author: "",
    language: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    bookName: "",
    author: "",
    language: "",
    publisher: "",
  });

  const bookRequestForm = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const bookRequestData = await postBookRequest(
      formData.name,
      formData.bookName,
      formData.author,
      formData.language,
      formData.publisher
    );
    if (bookRequestData.data) {
      toast.success("Book Request Sent !", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error(
        "Could not send request, Please fill the credentials again !",
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        }
      );
    }
    setLoading(false);
    onclose();
  };

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove error message as user types
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim())
      newErrors.name = "অনুগ্রহ করে আপনার নাম লিখুন।";
    if (!formData.bookName.trim())
      newErrors.bookName = "অনুগ্রহ করে বই এর নাম লিখুন।";
    if (!formData.author.trim())
      newErrors.author = "অনুগ্রহ করে লেখকের নাম লিখুন।";
    if (!formData.language.trim())
      newErrors.language = "অনুগ্রহ করে ভাষার নাম লিখুন।";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full max-h-[95vh] overflow-y-auto profile_btn_gradients max-w-md mx-auto px-8 pb-4 pt-6 rounded-2xl shadow-2xl text-white relative">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center mb-8 text-white drop-shadow-md">
        📚 বই সম্পর্কিত তথ্য দিন
      </h2>

      <div className="space-y-3">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার নাম লিখুন
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.name && <p className="text-yellow-300 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Book Name */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            বই এর নাম লিখুন
          </label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            placeholder="বই এর নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.bookName && <p className="text-yellow-300 text-xs mt-1">{errors.bookName}</p>}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            বই এর লেখক এর নাম লিখুন
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="লেখকের নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.author && <p className="text-yellow-300 text-xs mt-1">{errors.author}</p>}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            বই এর ভাষার নাম লিখুন
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="যেমন: বাংলা, ইংরেজি"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.language && <p className="text-yellow-300 text-xs mt-1">{errors.language}</p>}
        </div>

        {/* Publisher */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            প্রকাশনী (যদি থাকে)
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="প্রকাশনীর নাম (ঐচ্ছিক)"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-center">
        <CommonButton
          handleClick={bookRequestForm}
          className="w-full py-2 bg-white text-[#3A2768] font-semibold rounded-[4px] 
                    hover:bg-gray-100 transition-all duration-200 shadow-md"
        >
          {loading ? <Spinner size="w-4 h-4" /> : ""}
          জমা দিন
        </CommonButton>
      </div>
    </div>

  );
};

export default BookInfoForm;
