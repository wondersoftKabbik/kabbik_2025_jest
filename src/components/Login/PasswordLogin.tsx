import React, { useState } from 'react';
import { EyeOff } from 'lucide-react';
import { loginWithPassword } from '@/utils/apiServices';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/store';
import { setUser } from '@/store/slicers/userSlice';

export function PasswordLoginForm(
  {closeModal,handleClickForgetPassword}:
  {closeModal:(val:boolean)=>void,handleClickForgetPassword:()=>void}
) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [loader,setLoader]=useState(false);
  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    let loginData=await loginWithPassword(password)
    setLoader(false);

    if (loginData?.token) {
        dispatch(setUser(loginData.user))
        Cookies.set("isLogin", "true", {
        expires: 365,secure: true,          
        sameSite: 'None'
      });
        Cookies.set("token", loginData.token, {
          expires: 365,secure: true,          
          sameSite: 'None',
        });
        Cookies.set("id", loginData.user.id,{
          expires: 365,secure: true,          
          sameSite: 'None',  
        });

        toast.success("Login Successful!", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
        closeModal(true)
    }else{
      // console.log("Invalid Login Credentials")
      // alert("Invalid Login Credentials")
      toast.error("Invalid Login Credentials")
    }
    
  };

  return (
    <div className="bg-background flex items-center justify-center px-0 py-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card border transparent_border w-[345px] rounded-2xl shadow-2xl p-4">
          <form onSubmit={handleSubmit} className="">
            {/* Title */}
            {/* <h1 className="text-white text-xl font-bold">
              পাসওয়ার্ড তৈরি করুন
            </h1> */}

            {/* Form Fields */}
            <div className="mb-5">
              {/* Password Field */}
              <div className="">
                <div className="mt-2">
                  <label className="block text-sm text-white font-bold">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative mt-2">
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
                {/* <p className="text-[#B7B7B7]/60 text-[13px] pt-0 mt-0">
                  অন্তত ৮ টি অক্ষর থাকতে হবে
                </p> */}
              </div>
              <div className='flex justify-between items-center'>
                <div>
                  <input type='checkbox'/>
                  <label className='text-[#5C5C5C] text-xs'>পরবর্তীতে স্বয়ংক্রিয় লগইন করুন</label>
                </div>
                <p onClick={handleClickForgetPassword} className='text-[#FF9500] text-xs'>
                  পাসওয়ার্ড ভুলে গেছেন
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-[4px] bg-[#DF1E1E] text-white text-lg font-medium shadow-lg hover:bg-[#c41a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#DF1E1E] focus:ring-offset-2 focus:ring-offset-background"
            >
              লগিন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
