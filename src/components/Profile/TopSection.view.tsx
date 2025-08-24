import CurrentPackage from "@/svgs/CurrentPackage.svg";
import Tik from "@/svgs/Tik.svg";
import { Edit, Clock, BookOpen, CreditCard, Check } from "lucide-react";

export default function TopSection() {
  return (
    <div className="bg-[#121B46] py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Profile Container */}
        <div className="bg-[#121B46] rounded-xl border border-[#2f3556] p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Section */}
            <div className="flex items-center gap-6 flex-1 min-w-0">
              {/* Profile */}
              <div className="relative">
                <div
                  className="w-[96px] h-[96px] rounded-full bg-cover bg-center relative border-2 border-white/10"
                  style={{
                    backgroundImage:
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/e29df0ad35714110cd0c4d62c279d5363600e7df')",
                  }}
                >
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <Edit className="w-3.5 h-3.5 text-[#060F1E]" />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1 truncate">
                  সারা অ্যান্ডারসন
                </h1>
                <p className="text-white/80 text-sm">সদস্য সেপ্টেম্বর ২০২৩ থেকে</p>
              </div>
            </div>

            {/* Middle Stats */}
            <div className="flex items-center flex-wrap gap-8 text-white text-sm flex-1 ">
              {/* Hours */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2D7FF9] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold">মোট ২৮৪ ঘন্টা</div>
                  <div className="text-xs opacity-75">শোনা হয়েছে</div>
                </div>
              </div>

              {/* Books */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2D7FF9] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold">৩৮টি বই</div>
                  <div className="text-xs opacity-75">সম্পন্ন হয়েছে</div>
                </div>
              </div>

              {/* Billing */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2D7FF9] flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm">সাবস্ক্রিপশন বিলিং চক্র ৩০ দিন</div>
                  <div className="text-xs text-white/70">পরবর্তী বিল: ৩০ জুলাই।</div>
                </div>
              </div>
            </div>

            {/* Right Subscription Card */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 w-full md:w-auto md:justify-end">
              {/* Notice */}
              <div className="bg-white/5 backdrop-blur border rounded-[8px] z-10 relative h-full border-white/10 p-3 w-full md:max-w-[180px] shadow-sm">
                <div className="text-center text-white text-[15px] leading-[1.6] mb-3">
                আপনার সক্রিয় <br/>
                সাবস্ক্রিপশন চলছে ।<br/>
                সাবস্ক্রিপশন বাতিল <br/>
                করলে, আপনি প্যাকেজের    <br/>
                সুবিধা আর গ্রহণ করতে <br/>
                পারবেন না ।<br/> 
                </div>
                <button className="w-full bg-[#FF2D2D] text-white text-sm py-2 rounded mt-5">আন-সাবস্ক্রাইব</button>
              </div>

              {/* Premium Card */}
              <div className="relative w-full md:max-w-[200px]">
                <div className="relative rounded-[4px] border border-white/10 p-4 ">
                  {/* Badge */}
                  <span className="w-32 rounded-[100%] h-3w-32 inline-block absolute top-[-30px] left-[-40px] bg-[#121B46]">
                    <CurrentPackage/>
                  </span>
                  <div className="absolute -top-2 right-2 bg-gradient-to-r from-[#FF8FA4] to-[#BD3856] text-white text-[10px] px-2 py-1 rounded-full shadow">
                    🔥 টপ পিক
                  </div>

                  {/* Duration */}
                  <div className="text-center mb-2 z-10 relative">
                    <h3 className="text-[#E5C135] text-lg font-bold">১ মাস</h3>
                  </div>

                  {/* Pricing */}
                 <div className="border border-muted2 z-10 relative rounded-[4px] py-2 mt-6 px-2 subscribe_gradient">
                     <div className="text-center mb-3 z-10 relative">
                        <div className="flex items-center justify-center gap-2">
                        <span className="text-white/60 text-sm line-through">৭০</span>
                        <span className="text-white text-2xl font-bold">৫০</span>
                        <span className="text-white/80 text-sm">৳</span>
                        </div>
                        <div className="text-white text-[12px] mt-1">(অটো-রিনিউয়াল)</div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        {[
                            "নন্সটপ এন্টারটেইনমেন্ট",
                            "ডাউনলোড অপশন",
                            "এক্সক্লুসিভ অডিওবুক এক্সেস",
                            "বিলিং সাইকেল ১ দিন",
                            "ইমিডিয়েট সাপোর্ট",
                            ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full  flex items-center justify-center ">
                                <span className="w-2.5 h-2.5 text-white">
                                    <Tik  />
                                </span>
                                </div>
                                <div className="text-white text-[8px]">{feature}</div>
                            </div>
                        ))}
                    </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
