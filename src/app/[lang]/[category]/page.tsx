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
import PlayListBooks from '@/components/CategoryWiseBooks/PlayListBooks';

const CategoryPage = async({ params ,searchParams}: {searchParams: { [key: string]: string | string[] | undefined }, params: { category: string,lang:'en'|'bl' } }) => {
  const categoryName = params.category;
  let folders=searchParams.folders;
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
              <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[123px] absolute left-0 bottom-[-15px]`}></div>
             <div className="container mx-auto px-4 pt-4 pb-2 ">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-bengali text-cxl2 font-bold text-white mb-1 leading-tight">
                  {decodeWord(categoryName)}
                </h1>
                <p className="font-bengali text-cxl text-white/90 font-normal leading-relaxed">
                  শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                </p>
              </div>
            </div>
           </div>
         ):''}
         <div>
          
           <div>
               <CategorySelector folders={folders as string}/>
           </div>
            {isPodCast?
              <div className='mt-10'/>
            :
              <div className="container mx-auto px-4 pt-5 pb-5">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="font-bengali text-cxl2 font-bold text-white mb-2 leading-tight">
                    {decodeWord(categoryName)}
                  </h1>
                  <p className="font-bengali text-cn2 text-white/90 font-normal leading-relaxed">
                    শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                  </p>
                </div>
              </div>
            }
           {folders?
            <PlayListBooks 
              categoryName={categoryName}
              categoryData={categoryData}
              dict={dict}
              isPodCast={isPodCast}
              folders={folders as string}
            />:(
              <>
                  <div>
                <TopAudioBookSection
                  category={decodeWord(categoryName)}
                  data={categoryData?.data?.[0]?.data}
                />
              </div>
              <div>
                {categoryData?.data?.[0]?.data?.[11]?
                  <ThreeDBanner dict={dict} book={categoryData?.data?.[0]?.data?.[11]}/>
                :''}
              </div>
              <div className={`${container('1209px')} relative`}>
                
                  <div className="grid mt-10 grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
                    {categoryData?.data ? categoryData?.data?.[0]?.data.slice(12,22).map((audiobook) => (
                      <AudiobookCard 
                        key={audiobook.id} 
                        category={categoryName}
                        audiobook={audiobook}
                        className="max-w-sm mx-auto"
                      />
                    )):''}
                  </div>
              </div>
              <div className='mt-10 bg-[#09152B] border-[#8D8D8D]'>
                    {isPodCast?"":<ReferAndEarn/>}
              </div>
              <div className={`${container('1209px')} relative`}>
                  <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
                  <div className="circular_gradient right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div>
                  <div className="mt-10  grid grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
                    {categoryData?.data ? categoryData?.data?.[0]?.data.slice(23,).map((audiobook) => (
                      <AudiobookCard 
                        key={audiobook.id} 
                        category={categoryName}
                        audiobook={audiobook}
                        className="max-w-sm mx-auto"
                      />
                    )):''}
                  </div>
              </div>
              </>
           )}
         </div>
       </div>
    </div>
  )
}

export default CategoryPage