"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import { toast } from "react-toastify";
import Spinner from "../ui/Spinner.view";
import { updateProfile } from "@/utils/apiServices";
import { useAppSelector } from "@/store/store";

const ProfileInfoForm = ({onclose}:{onclose:()=>void}) => {
  const user=useAppSelector(store=>store?.user?.userData)
  const [loading,setLoading]=useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phoneNo: "",
    city_name: "",
    address: "",
  });
  const [formData, setFormData] = useState({
    name: user?.full_name??'',
    phoneNo: user?.phone_no??'',
    city_name: user?.city??'',
    address: user?.address??'',
    postCode: user?.post_code ?? '',
  });

   const updateProfileForm = async (event: any) => {
    event.preventDefault();

    const payloadData = {
      full_name: formData.name,
      phone_no: formData.phoneNo,
      city_name: formData.city_name,
      address: formData.address,
      post_code: formData.postCode,
    };
    const updatedProfileData = await updateProfile(payloadData);
    window.location.reload();
    if (updatedProfileData.message) {
      toast.success(`${updatedProfileData.message} !`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      // window.location.reload('/profile');
    } else {
      toast.error(`${updatedProfileData.message} !`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
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
    if (!formData.phoneNo.trim())
      newErrors.phoneNo = "অনুগ্রহ করে বই এর নাম লিখুন।";
    if (!formData.city_name.trim())
      newErrors.city_name = "অনুগ্রহ করে লেখকের নাম লিখুন।";
    if (!formData.address.trim())
      newErrors.address = "অনুগ্রহ করে ভাষার নাম লিখুন।";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full max-h-[95vh] overflow-y-auto profile_btn_gradients max-w-md mx-auto p-6 rounded-[8px] bg-white/50 shadow-lg">
      <h2 className="text-xl mt-4 font-semibold text-center mb-5 text-white/90">
        📚 বই সম্পর্কিত তথ্য দিন
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">
            আপনার নাম লিখুন
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/text-white/90"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">
            বই এর নাম লিখুন
          </label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="বই এর নাম"
            className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/text-white/90"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">
            বই এর লেখক এর নাম লিখুন
          </label>
          <input
            type="text"
            name="city_name"
            value={formData.city_name}
            onChange={handleChange}
            placeholder="লেখকের নাম"
            className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/text-white/90"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.city_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">
            বই এর ভাষার নাম লিখুন
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="যেমন: বাংলা, ইংরেজি"
            className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/text-white/90"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-white/80">
            প্রকাশনী (যদি থাকে)
          </label>
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            placeholder="প্রকাশনীর নাম (ঐচ্ছিক)"
            className="w-full border border-gray-300 rounded-[4px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/text-white/90"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <CommonButton
          handleClick={updateProfileForm}
          className="bg-white/50 text-white/90  text-white px-6 py-2 rounded-[4px] font-semibold transition-all duration-200 w-full"
        >
            {loading?<Spinner size="w-3 h-3"/>:''}
          জমা দিন
        </CommonButton>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
