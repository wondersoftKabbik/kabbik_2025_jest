'use client'
import { TBooks } from "@/pageTypes/home.types";
import ThreeDBook from "../ui/ThreeDBook.view";
import { paths } from "@/utils/Paths";
import styles from "@/components/CategoryWiseBooks/static/CategorySelector.module.css"
import { useTranslation } from 'next-i18next';
import { DictionaryType } from "@/locales/locales.types";
import { numberTranslator } from "@/helpers/commonFunction";
import CircularStar from "@/svgs/CircularStar.svg";
import Traingle from "@/svgs/Traingle.svg";


export default function ThreeDBanner({book,dict}:{book:TBooks|null,dict:DictionaryType}) {
  return (
   <div className={`mt-28 ${styles.ThreeDBannerGradient} `}>
  <div className={`flex justify-between  max-w-[1209px] w-[90%] mx-auto`}>
    {/* Book Cover Image */}
    <div className="min-w-[40%] mt-[-120px]">
      {book ? (
        <ThreeDBook path={paths.book_details(book.id)} bg={book?.thumb_path} />
      ) : null}
    </div>

    {/* Content Section */}
    <div className="">
      
      {/* Main Heading */}
      <div className="">
        <h1 className="text-2xl sm:text-cxl text-white font-medium leading-tight lg:leading-[50.4px] ">
          {numberTranslator(book?.play_count??0,dict.numbers)}-এরও বেশি মানুষ এই বইটি শুনেছেন!
        </h1>

        {/* Rating Section */}
        <div className="flex flex-col my-7 items-center gap-6 lg:gap-8">
          
          {/* Star Rating */}
          <div className="flex items-center gap-3 lg:gap-[14px]">
            {[...Array(Math.ceil(Number(book?.rating)))].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center"
              >
                <CircularStar/>
              </div>
            ))}
          </div>

          {/* Rating Text */}
          <h2 className="text-xl sm:text-cxl text-white font-medium leading-tight lg:leading-[50.4px]">
            পাঠকের রিভিউ – ৫/{numberTranslator(Number((book?.rating)?.toFixed(1))??0,dict.numbers)} রেটিং!
          </h2>
        </div>
      </div>

      {/* Play Button */}
      <div className="w-full max-w-[421px] mx-auto ">
        <button className="w-full rounded-[8px] bg-gradient-to-r from-[#001F29] to-[#734DCE] border border-[#888] shadow-lg flex items-center justify-center gap-5 lg:gap-[22px] py-2 px-6 hover:opacity-90 transition-opacity">
          <span className="w-5">
            <Traingle/>
          </span>
          <span className="text-white text-lg sm:text-clg font-medium">
            এখনই শুনুন
          </span>
        </button>
      </div>
    </div>
  </div>
</div>

  );
}
