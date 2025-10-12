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
    if(!validateForm())return;
    setLoading(true)
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
    setLoading(false)
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
    <div className="w-full max-h-[95vh] overflow-y-auto profile_btn_gradients max-w-md mx-auto p-8 rounded-2xl shadow-2xl text-white relative">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-center mb-8 text-white drop-shadow-md">
        আপনার প্রোফাইল আপডেট করুন
      </h2>

      <div className="space-y-5">
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

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            ফোন নম্বর
          </label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="8801800000000"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.phoneNo && <p className="text-yellow-300 text-xs mt-1">{errors.phoneNo}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার শহর এর নাম লিখুন
          </label>
          <input
            type="text"
            name="city_name"
            value={formData.city_name}
            onChange={handleChange}
            placeholder="Dhaka"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.city_name && <p className="text-yellow-300 text-xs mt-1">{errors.city_name}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার ঠিকানা লিখুন
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="mohakhali, amtoli, road 5"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.address && <p className="text-yellow-300 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Postcode */}
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            পোস্টকোড লিখুন
          </label>
          <input
            type="text"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            placeholder="1112"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-center">
        <CommonButton
          handleClick={updateProfileForm}
          className="w-full py-2 bg-white text-[#3A2768] font-semibold rounded-[4px] 
                    hover:bg-gray-100 transition-all duration-200 shadow-md"
        >
          {loading ? <Spinner size="w-4 h-4" /> : ""}
          সেভ করুন
        </CommonButton>
      </div>
    </div>

  );
};

export default ProfileInfoForm;
