import React, { useState } from "react";
import { ReferralData } from "./static/refeAndEarn.type";
import Spinner from "../ui/Spinner.view";

interface RewardTypeSelectorProps {
  onSelect?: (value: string) => void;
  referJSON?:ReferralData|null;
  handleSubmit:(val:number)=>Promise<void>;
}

const RewardTypeSelector: React.FC<RewardTypeSelectorProps> = ({ onSelect ,referJSON,handleSubmit}) => {
  const [selected, setSelected] = useState<string>("");
  const [loading,setLoading]=useState(false);

  const handleChange = (value: string) => {
    setSelected(value);
    onSelect?.(value);
  };

  const submitHandler=async()=>{
    setLoading(true)
    let result = await handleSubmit(Number(selected));
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        এমাউন্ট নির্বাচন করুন
      </h2>

      <div className="space-y-3">
        {referJSON?.withdrawal_amounts.map((option) => (
          <label
            key={option.amount}
            className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition-all ${
              selected === option.amount
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            <span className="text-gray-800">{option.title_amount}</span>
            <input
              type="radio"
              name="rewardType"
              value={option.amount}
              checked={selected === option.amount}
              onChange={() => handleChange(option.amount)}
              className="w-4 h-4 text-blue-600 focus:ring-0"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 text-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
          onClick={submitHandler}
          disabled={!selected}
        >
            {loading?<Spinner size="w-3 h-3"/>:''}
          নিশ্চিত করুন
        </button>
      </div>
    </div>
  );
};

export default RewardTypeSelector;
