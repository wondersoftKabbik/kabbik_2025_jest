import React, { useState } from 'react';
import { EyeOff } from 'lucide-react';

export function PasswordCreationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Password creation submitted');
  };

  return (
    <div className="bg-background flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card border transparent_border rounded-2xl shadow-2xl p-8 md:p-8">
          <form onSubmit={handleSubmit} className="">
            {/* Title */}
            <h1 className="text-white text-xl font-bold">
              পাসওয়ার্ড তৈরি করুন
            </h1>

            {/* Form Fields */}
            <div className="mb-5">
              {/* Password Field */}
              <div className="">
                <div className="mt-4">
                  <label className="block text-sm text-white font-bold">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative mt-3">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                    //   type="text"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="আপনার পাসওয়ার্ড লিখুন"
                      className="w-full py-2 px-6 md:px-8 bg-transparent border transparent_border rounded-[4px] shadow-lg placeholder:text-white/40 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#565454] hover:text-[#404040] transition-colors"
                    >
                      <EyeOff size={21} />
                    </button>
                  </div>
                </div>
                <p className="text-[#B7B7B7]/60 text-[13px] pt-0 mt-0">
                  অন্তত ৮ টি অক্ষর থাকতে হবে
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className=" mt-6">
                <label className="block text-sm text-white font-bold">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative mt-3">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    // type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                    className="w-full py-2 px-6 md:px-8 bg-transparent border transparent_border rounded-[4px] shadow-lg placeholder:text-white/40 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#565454] hover:text-[#404040] transition-colors"
                  >
                    <EyeOff size={21} />
                  </button>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-[4px] bg-[#DF1E1E] text-white text-lg font-medium shadow-lg hover:bg-[#c41a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#DF1E1E] focus:ring-offset-2 focus:ring-offset-background"
            >
              কন্টিনিউ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
