export default function LoginModal() {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Background blur effects */}
      <div className="absolute top-[-12.5rem] right-[-12.5rem] w-[22rem] h-[22rem] rounded-full gradient-blur opacity-60 lg:w-[35.4rem] lg:h-[35.4rem] lg:top-[-20.2rem] lg:right-[-30.9rem]"></div>
      <div className="absolute bottom-[-12.5rem] left-[-12.5rem] w-[22rem] h-[22rem] rounded-full gradient-blur opacity-60 lg:w-[35.4rem] lg:h-[35.4rem] lg:bottom-[138.8rem] lg:left-[-30.9rem]"></div>
      <div className="absolute top-[32rem] left-1/2 transform -translate-x-1/2 w-[45rem] h-[45rem] rounded-full gradient-blur-large opacity-40 lg:w-[71.9rem] lg:h-[71.9rem] lg:top-[64.2rem]"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo/Brand */}
        <div className="mb-8 lg:mb-16">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/133e859067da0515a4f6053251be2b06a25cb044?width=1184" 
            alt="কাব্যিক অডিওবুক ইয়েখানে শশেদরা জীবন্ত" 
            className="w-72 h-auto max-w-full lg:w-[37rem]"
          />
        </div>
        
        {/* Login Card */}
        <div className="w-full max-w-2xl lg:max-w-6xl">
          <div className="glass-morphism rounded-2xl p-6 lg:p-16 w-full min-w-[700px] max-w-[932px] mx-auto">
            {/* Header Section */}
            <div className="mb-8 lg:mb-12">
              <h1 className="text-white text-2xl lg:text-[2.625rem] font-semibold lg:font-bold mb-2 lg:mb-3">
                সাইন আপ
              </h1>
              <p className="text-white text-lg lg:text-[1.875rem] font-normal">
                অলরেডি হ্যাভ এন অ্যাকাউন্ট?{" "}
                <span className="text-login-red cursor-pointer hover:underline">
                  লগইন করুন
                </span>
              </p>
            </div>
            
            {/* Login Methods */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <p className="text-white text-lg lg:text-[1.875rem] mb-4 lg:mb-6">
                  লগইন করুন
                </p>
                
                {/* Social Login Buttons */}
                <div className="space-y-4 lg:space-y-6">
                  {/* Facebook Button */}
                  <button className="w-full bg-button-bg rounded-lg p-3 lg:p-4 button-shadow flex items-center justify-center lg:justify-start lg:px-8 gap-4 lg:gap-8 hover:bg-gray-300 transition-colors">
                    <svg className="w-8 h-8 lg:w-[6.5rem] lg:h-[6.5rem] flex-shrink-0" viewBox="0 0 104 104" fill="none">
                      <path d="M86.6666 52.2169C86.5856 45.6108 84.6183 39.1653 80.9965 33.6397C77.3747 28.1141 72.2496 23.7384 66.2246 21.0281C60.1991 18.3177 53.5249 17.3855 46.9876 18.3412C40.4505 19.297 34.3224 22.1008 29.3254 26.4227C24.3283 30.7445 20.6702 36.4042 18.7819 42.7354C16.8937 49.0666 16.8539 55.8054 18.6674 62.1585C20.4808 68.5116 24.0718 74.2138 29.0176 78.5944C33.9633 82.9749 40.0578 85.851 46.5833 86.8836V62.3136H37.9167V52.2169H46.5833V44.5469C46.3827 42.7636 46.5759 40.9578 47.1497 39.2573C47.7234 37.5567 48.6633 36.0028 49.9031 34.7051C51.1428 33.4075 52.6521 32.3978 54.3248 31.7473C55.9975 31.0968 57.7928 30.8213 59.5833 30.9404C62.1824 30.976 64.7755 31.2078 67.34 31.6337V40.3004H63.0066C62.2596 40.2061 61.5004 40.281 60.7862 40.5195C60.0717 40.7579 59.4199 41.1539 58.8791 41.678C58.3383 42.2022 57.9223 42.8412 57.6619 43.5477C57.401 44.2544 57.3027 45.0106 57.3733 45.7603V52.3036H66.9933L65.4333 62.4003H57.4166V86.6669C65.6062 85.3717 73.0604 81.184 78.4268 74.8634C83.7932 68.5428 86.7165 60.5083 86.6666 52.2169Z" fill="#2678FF"/>
                    </svg>
                    <span className="text-button-text text-xl lg:text-[2.625rem] font-semibold lg:font-bold">
                      ফেসবুক
                    </span>
                  </button>
                  
                  {/* Google Button */}
                  <button className="w-full bg-button-bg rounded-lg p-3 lg:p-4 button-shadow flex items-center justify-center lg:justify-start lg:px-8 gap-4 lg:gap-12 hover:bg-gray-300 transition-colors">
                    <svg className="w-8 h-8 lg:w-[4.25rem] lg:h-[4.25rem] flex-shrink-0" viewBox="0 0 68 68" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.631 34.0007C14.631 31.8413 14.9897 29.7711 15.6298 27.8293L4.42563 19.2734C2.242 23.707 1.01172 28.7028 1.01172 34.0007C1.01172 39.2941 2.24048 44.2869 4.42109 48.7174L15.6192 40.1449C14.9851 38.2122 14.631 36.1495 14.631 34.0007Z" fill="#FBBC05"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M34.3035 14.3559C38.9946 14.3559 43.2318 16.0181 46.5609 18.7381L56.2458 9.06697C50.3441 3.92919 42.7778 0.755859 34.3035 0.755859C21.1473 0.755859 9.84022 8.27968 4.42578 19.273L15.6299 27.8289C18.2116 19.9923 25.5705 14.3559 34.3035 14.3559Z" fill="#EB4335"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M34.3035 53.6449C25.5705 53.6449 18.2116 48.0085 15.6299 40.1719L4.42578 48.7263C9.84022 59.7211 21.1473 67.2449 34.3035 67.2449C42.4237 67.2449 50.1761 64.3617 55.9946 58.9595L45.3594 50.7376C42.3586 52.628 38.58 53.6449 34.3035 53.6449Z" fill="#34A853"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M66.0811 33.9995C66.0811 32.0351 65.7785 29.9195 65.3245 27.9551H34.3027V40.7995H52.1592C51.2663 45.1787 48.8361 48.5455 45.3586 50.7366L55.9938 58.9585C62.1058 53.2858 66.0811 44.8357 66.0811 33.9995Z" fill="#4285F4"/>
                    </svg>
                    <span className="text-button-text text-xl lg:text-[2.625rem] font-semibold lg:font-bold">
                      গুগল
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Or Divider */}
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex-1 h-px bg-white"></div>
                <span className="text-white text-lg lg:text-[1.875rem] px-2">
                  অথবা
                </span>
                <div className="flex-1 h-px bg-white"></div>
              </div>
              
              {/* Phone Number Login */}
              <button className="w-full bg-phone-button rounded-lg p-4 lg:p-6 button-shadow flex items-center justify-center lg:justify-start lg:px-8 gap-4 lg:gap-8 hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 lg:w-[3.625rem] lg:h-[3.625rem] flex-shrink-0" viewBox="0 0 58 58" fill="none">
                  <g clipPath="url(#clip0_598_32802)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M56.9571 50.2517C55.1669 55.6921 48.1527 58.4053 43.1415 57.9529C36.2975 57.3342 28.8504 53.7042 23.1973 49.706C14.8878 43.8287 7.10421 34.7374 2.56861 25.09C-0.636857 18.2731 -1.35605 9.89171 3.41155 3.67797C5.17475 1.38117 7.08101 0.154502 9.94621 0.011435C13.9211 -0.181898 14.478 2.09209 15.8429 5.63396C16.8598 8.28263 18.217 10.9845 18.9749 13.7298C20.3939 18.8531 15.433 19.0673 14.8066 23.2549C14.4161 25.8958 17.6177 29.4374 19.0638 31.3205C21.8981 35.0093 25.3046 38.1909 29.1481 40.6114C31.3482 41.9996 34.9017 44.501 37.4227 43.1206C41.3049 40.9939 40.9375 34.448 46.3663 36.6636C49.1774 37.8081 51.8995 39.4598 54.583 40.906C58.7319 43.137 58.5386 45.4493 56.9571 50.2517C58.1403 46.6634 55.7739 53.8399 56.9571 50.2517Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_598_32802">
                      <rect width="58" height="58" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-white text-xl lg:text-[2.625rem] font-normal">
                  ফোন নম্বর দিয়ে লগইন করুন
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
