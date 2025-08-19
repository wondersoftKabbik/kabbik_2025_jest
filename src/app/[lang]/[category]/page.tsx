import { AudiobookCard } from '@/components/CategoryWiseBooks/AudioBookCard.view';
import CategorySelector from '@/components/CategoryWiseBooks/CategorySelector.view';
import { TCategoryComponent } from '@/components/CategoryWiseBooks/static/category.types';
import ThreeDBanner from '@/components/CategoryWiseBooks/ThreeDBanner.view';
import TopAudioBookSection from '@/components/CategoryWiseBooks/TopAudioBookSection.view';
import { container } from '@/components/ui/static/tailwind.classes';
import { decodeWord } from '@/helpers/commonFunction';
import { homeCatagoryItems } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import ReferAndEarn from '@/components/CategoryWiseBooks/ReferAndEarn.view';

const CategoryPage = async({ params }: { params: { category: string,lang:'en'|'bl' } }) => {
  const categoryName = params.category;
  const { lang } = await params
    const dict = await getDictionary(lang) // en
  const categoryData:TCategoryComponent['categoryData'] = await homeCatagoryItems(categoryName);
  const isPodCast=(decodeWord(categoryName)==='কাব্যিক গ্যালারী') ||(decodeWord(categoryName)==="পডকাস্ট");
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         {isPodCast?(
           <div className='relative'>
              <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[256px] absolute left-0 bottom-[-15px]`}></div>
             <div className="container mx-auto px-4 pt-16 pb-12 ">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-bengali text-[45px] md:text-[52px] font-bold text-white mb-6 leading-tight">
                  {decodeWord(categoryName)}
                </h1>
                <p className="font-bengali text-2xl md:text-4xl text-white/90 font-normal leading-relaxed">
                  শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                </p>
              </div>
            </div>
           </div>
         ):''}
         <div>
          
           <div>
               <CategorySelector/>
           </div>
            {isPodCast?
              <div className='mt-10'/>
            :
              <div className="container mx-auto px-4 pt-16 pb-12">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="font-bengali text-[45px] md:text-[55px] font-bold text-white mb-6 leading-tight">
                    {decodeWord(categoryName)}
                  </h1>
                  <p className="font-bengali text-2xl md:text-4xl text-white/90 font-normal leading-relaxed">
                    শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                  </p>
                </div>
              </div>
            }
           <div>
             <TopAudioBookSection
               category={decodeWord(categoryName)}
               data={categoryData?.data?.[0]?.data}
             />
           </div>
           <div>
            {categoryData?.data?.[0]?.data?.[8]?
              <ThreeDBanner dict={dict} book={categoryData?.data?.[0]?.data?.[8]}/>
            :''}
           </div>
           <div className={`${container('1209px')}`}>
              <div className="grid mt-20 grid-cols-2  lg:grid-cols-4  gap-6 md:gap-8">
                {categoryData?.data ? categoryData?.data?.[0]?.data.slice(9,17).map((audiobook) => (
                  <AudiobookCard 
                    key={audiobook.id} 
                    category={categoryName}
                    audiobook={audiobook}
                    className="max-w-sm mx-auto"
                  />
                )):''}
              </div>
           </div>
           <div className='mt-16 bg-[#09152B] border-[#8D8D8D]'>
                {isPodCast?"":<ReferAndEarn/>}
           </div>
           <div className={`${container('1209px')}`}>
              <div className="mt-20  grid grid-cols-2  lg:grid-cols-4  gap-6 md:gap-8">
                {categoryData?.data ? categoryData?.data?.[0]?.data.slice(17,).map((audiobook) => (
                  <AudiobookCard 
                    key={audiobook.id} 
                    category={categoryName}
                    audiobook={audiobook}
                    className="max-w-sm mx-auto"
                  />
                )):''}
              </div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default CategoryPage