"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import Spinner from "../ui/Spinner.view";
import { redeemCodePostApi } from "@/utils/apiServices";

const ReedemCodeActivate = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [redeem, setRedeem] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async() => {
    if (redeem.trim().length<3) {
      setError("দয়া করে সঠিক রিডিম কোড দিন");
      return;
    }
    setLoading(true);
    setError("");
    const redeemData = await redeemCodePostApi(redeem);
    window.location.replace("/profile");
    setLoading(false);
    onClose();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg profile_btn_gradients text-white">
      <h2 className="text-xl font-medium mb-4 mt-4 text-center">
        সাবস্ক্রিপশন একটিভ করতে নিচে আপনার রিডিম কোড ব্যবহার করুন
      </h2>
      <div className="space-y-3">
        <input
          type="text"
          value={redeem}
          onChange={(e) => setRedeem(e.target.value)}
          placeholder="উদাহরণ: ABCED"
          className="w-full px-4 py-2 rounded-[4px] border border-white/30 text-black focus:ring-2 focus:ring-white outline-none placeholder-gray-400"
        />
        {error && (
          <p className="text-cs text-yellow-400 rounded mt-0">
             {error}
          </p>
        )}
        <CommonButton
          handleClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-[#38EF7D] text-white hover:bg-green-600/90 font-semibold text-base rounded-[4px] transition-all duration-200"
        >
            {loading?<Spinner size="w-3 h-3"/>:''}
          সাবমিট করুন
        </CommonButton>
      </div>
    </div>
  );
};

export default ReedemCodeActivate;
