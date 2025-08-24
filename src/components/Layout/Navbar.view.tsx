"use client";
import { useState } from "react";

export default function AuthPage() {
  const [pho, setIsLogin] = useState(true);

  return (
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-sm border border-gray-300 rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-4xl md:text-5xl font-semibold">
              সাইন আপ
            </h1>
            <p className="text-white text-2xl md:text-3xl">
              অলরেডি হ্যাভ এন অ্যাকাউন্ট?{" "}
              <span className="text-red-500 cursor-pointer hover:underline">
                লগইন করুন
              </span>
            </p>
          </div>

          {/* Social Login Section */}
          <div className="flex flex-col gap-7">
            <h2 className="text-white text-2xl md:text-3xl">লগইন করুন</h2>
            
            {/* Facebook Button */}
            <button className="w-full bg-gray-300 hover:bg-gray-200 transition-colors rounded-lg shadow-md py-6 px-4 flex items-center gap-8 md:gap-12">
              <div className="w-24 h-24 flex-shrink-0">
                <svg width="100%" height="100%" viewBox="0 0 104 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M86.6666 53.1759C86.5856 46.5697 84.6183 40.1243 80.9965 34.5987C77.3747 29.0731 72.2496 24.6974 66.2246 21.987C60.1991 19.2767 53.5249 18.3445 46.9876 19.3002C40.4505 20.256 34.3224 23.0598 29.3254 27.3817C24.3283 31.7035 20.6702 37.3632 18.7819 43.6944C16.8937 50.0256 16.8539 56.7643 18.6674 63.1174C20.4808 69.4705 24.0718 75.1728 29.0176 79.5533C33.9633 83.9339 40.0578 86.8099 46.5833 87.8426V63.2726H37.9167V53.1759H46.5833V45.5059C46.3827 43.7226 46.5759 41.9168 47.1497 40.2163C47.7234 38.5157 48.6633 36.9617 49.9031 35.6641C51.1428 34.3665 52.6521 33.3568 54.3248 32.7063C55.9975 32.0558 57.7928 31.7803 59.5833 31.8994C62.1824 31.9349 64.7755 32.1667 67.34 32.5927V41.2594H63.0066C62.2596 41.1651 61.5004 41.24 60.7862 41.4785C60.0717 41.7169 59.4199 42.1129 58.8791 42.637C58.3383 43.1612 57.9223 43.8002 57.6619 44.5066C57.401 45.2134 57.3027 45.9696 57.3733 46.7192V53.2626H66.9933L65.4333 63.3592H57.4166V87.6259C65.6062 86.3307 73.0604 82.1429 78.4268 75.8223C83.7932 69.5017 86.7165 61.4673 86.6666 53.1759Z" fill="#2678FF"/>
                </svg>
              </div>
              <span className="text-black text-3xl md:text-4xl font-semibold">
                ফেসবুক
              </span>
            </button>

            {/* Google Button */}
            <button className="w-full bg-gray-300 hover:bg-gray-200 transition-colors rounded-lg shadow-md py-6 px-4 flex items-center gap-8 md:gap-12">
              <div className="w-16 h-16 ml-4 flex-shrink-0">
                <svg width="100%" height="100%" viewBox="0 0 68 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_566_30820)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.631 34.9597C14.631 32.8003 14.9897 30.7301 15.6298 28.7883L4.42563 20.2324C2.242 24.666 1.01172 29.6618 1.01172 34.9597C1.01172 40.2531 2.24048 45.2458 4.42109 49.6764L15.6192 41.1039C14.9851 39.1712 14.631 37.1085 14.631 34.9597Z" fill="#FBBC05"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M34.3035 15.3148C38.9946 15.3148 43.2318 16.9771 46.5609 19.6971L56.2458 10.026C50.3441 4.88818 42.7778 1.71484 34.3035 1.71484C21.1473 1.71484 9.84022 9.23867 4.42578 20.232L15.6299 28.7879C18.2116 20.9513 25.5705 15.3148 34.3035 15.3148Z" fill="#EB4335"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M34.3035 54.6039C25.5705 54.6039 18.2116 48.9675 15.6299 41.1309L4.42578 49.6853C9.84022 60.6801 21.1473 68.2039 34.3035 68.2039C42.4237 68.2039 50.1761 65.3207 55.9946 59.9185L45.3594 51.6965C42.3586 53.5869 38.58 54.6039 34.3035 54.6039Z" fill="#34A853"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M66.0811 34.9585C66.0811 32.9941 65.7785 30.8785 65.3245 28.9141H34.3027V41.7585H52.1592C51.2663 46.1377 48.8361 49.5045 45.3586 51.6956L55.9938 59.9175C62.1058 54.2448 66.0811 45.7947 66.0811 34.9585Z" fill="#4285F4"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_566_30820">
                      <rect width="68" height="68" fill="white" transform="translate(0 0.958984)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="text-black text-3xl md:text-4xl font-semibold">
                গুগল
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-5">
            <div className="flex-1 h-px bg-white"></div>
            <span className="text-white text-2xl md:text-3xl px-4">অথবা</span>
            <div className="flex-1 h-px bg-white"></div>
          </div>

          {/* Phone Input Section */}
          <div className="flex flex-col gap-5">
            <label className="text-white text-2xl md:text-3xl font-medium">
              ফোন নম্বর
            </label>
            
            <div className="relative">
              <div className="w-full border border-white rounded-lg shadow-md bg-transparent">
                <div className="flex items-center">
                  {/* Country Code Section */}
                  <div className="flex items-center gap-2 px-6 py-7 border-r border-gray-300">
                    <div className="w-12 h-12 flex-shrink-0">
                      <svg width="100%" height="100%" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M52 39.9594C52 41.4918 51.3913 42.9614 50.3077 44.0449C49.2242 45.1285 47.7546 45.7372 46.2222 45.7372H5.77778C4.24542 45.7372 2.77582 45.1285 1.69227 44.0449C0.608728 42.9614 0 41.4918 0 39.9594V13.9594C0 12.4271 0.608728 10.9575 1.69227 9.87391C2.77582 8.79037 4.24542 8.18164 5.77778 8.18164H46.2222C47.7546 8.18164 49.2242 8.79037 50.3077 9.87391C51.3913 10.9575 52 12.4271 52 13.9594V39.9594Z" fill="#006A4D"/>
                        <path d="M23.1111 36.3472C28.6953 36.3472 33.2222 31.8203 33.2222 26.2361C33.2222 20.6519 28.6953 16.125 23.1111 16.125C17.5269 16.125 13 20.6519 13 26.2361C13 31.8203 17.5269 36.3472 23.1111 36.3472Z" fill="#F42A41"/>
                      </svg>
                    </div>
                    <svg className="w-10 h-10 text-gray-400" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4632 18.7623C9.74727 19.4783 9.74727 20.6391 10.4632 21.3551L19.4324 30.3153C20.8644 31.746 23.1851 31.7455 24.6165 30.3142L33.5822 21.3485C34.2981 20.6325 34.2981 19.4717 33.5822 18.7557C32.8662 18.0398 31.7054 18.0398 30.9894 18.7557L23.3158 26.4294C22.5999 27.1455 21.439 27.1455 20.7231 26.4294L13.0559 18.7623C12.34 18.0464 11.1793 18.0464 10.4632 18.7623Z" fill="#8E8E8E"/>
                    </svg>
                    <span className="text-white text-2xl md:text-3xl">+৮৮০</span>
                  </div>
                  
                  {/* Phone Input */}
                  <input
                    type="tel"
                    // value={phoneNumber}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    className="flex-1 bg-transparent text-white text-2xl md:text-3xl placeholder-gray-400 px-6 py-7 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-lg shadow-md py-8 px-6">
            <span className="text-white text-3xl md:text-4xl font-medium">
              কন্টিনিউ
            </span>
          </button>
        </div>
      </div>
  );
}
