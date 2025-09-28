import LinkIcon from "@/svgs/LinkIcon.svg";
import { container } from "../ui/static/tailwind.classes";

export default function ReferAndEarn() {
  return (
    <div className="border border-[#8D8D8D]">
      <div className={container('1402px')}>
        {/* Main referral section */}
        <div className="flex flex-col lg:flex-row items-center  justify-center py-3">
          {/* Left side - Illustration */}
          {/* <div className="w-[35.5%] max-w-[300px]">
            <img
              src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/referAndEarn.png"
              alt="Referral illustration showing people with megaphones"
              className="w-full"
            />
          </div> */}

          {/* Right side - Content */}
          <div className="w-[55%]">
            {/* Main header with gradient background */}
            <div className="flex items-center justify-center btn-gradient-2 px-5 py-2 rounded-[8px]">
                <img src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/image.svg" className="w-7 mr-3"/>
                <h1 className="text-white text-center font-inter font-semibold text-xl sm:text-2xl md:text-cxl">
                    রেফার করুন এবং উপার্জন করুন!
                </h1>
            </div>

            {/* Content section */}
            <div className="flex flex-col items-center gap-3 w-full">
              {/* Description text */}
              <div className="w-full text-center xl:text-left">
                <p className="text-white font-inter text-base sm:text-lg md:text-cn2 text-justify my-5 xl:leading-10">
                  আপনার বন্ধুদের আমাদের অডিওবুক প্ল্যাটফর্মে আমন্ত্রণ{' '}
                  জানান    এবং  প্রতি বার কেউ আপনার রেফারেল লিংক{' '}
                  ব্যবহার করে সাইন আপ করলেই পুরস্কার জিতুন।
                </p>
              </div>

              {/* Call to action */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 cursor-pointer group">
                <span className="text-center font-inter text-lg sm:text-xl md:text-cn2 gradient-text2">
                  এখনই আপনার রেফারেল লিংক সংগ্রহ করুন
                </span>
                <div className="p-2 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <span className="w-3">
                    <LinkIcon/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
