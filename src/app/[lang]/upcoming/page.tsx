import { AudiobookCard } from '@/components/CategoryWiseBooks/AudioBookCard.view';
import CategorySelector from '@/components/CategoryWiseBooks/CategorySelector.view';
import { TCategoryComponent } from '@/components/CategoryWiseBooks/static/category.types';
import ThreeDBanner from '@/components/CategoryWiseBooks/ThreeDBanner.view';
import TopAudioBookSection from '@/components/CategoryWiseBooks/TopAudioBookSection.view';
import { container } from '@/components/ui/static/tailwind.classes';
import { decodeWord } from '@/helpers/commonFunction';
import { homeCatagoryItems, upcomingList } from '@/utils/apiServices';
import React from 'react'
import { getDictionary } from '../dictionaries';
import ReferAndEarn from '@/components/CategoryWiseBooks/ReferAndEarn.view';
import { UpComingInfo } from '@/utils/types';
import { BookCard } from '@/components/CategoryWiseBooks/Upcoming.view';

const CategoryPage = async({ params }: { params: { category: string,lang:'en'|'bl' } }) => {
  const { lang } = await params
    const dict = await getDictionary(lang) // en
    const upcomingData: UpComingInfo = await upcomingList();
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         <div>
           <div>
               <CategorySelector/>
           </div>
           <div className={container('1300px')}>
                <div className=" bg-navy-dark">
      {/* Header Section */}
                    <div className="pt-4 pb-8 lg:pb-6 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-white font-bengali font-bold text-cxl2 mb-1 leading-tight">
                            আপকামিং বুক
                        </h1>
                        <p className="text-white font-bengali text-lg sm:text-cxl font-normal leading-tight lg:leading-[50.4px]">
                            শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                        </p>
                        </div>
                    </div>

        {/* Books Grid */}
                    <div className="px-4 pb-16">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
                                {upcomingData.data?upcomingData.data.map((book, index) => (
                                    <BookCard
                                        key={index}
                                        title={book.name}
                                        author={book.author}
                                        description={book.description}
                                        imageUrl={book.thumbPath}
                                        slug={book.id?.toString()}
                                    />
                                )):''}
                            </div>
                            </div>
                    </div>
                </div>
           </div>
         </div>
       </div>
    </div>
  )
}

export default CategoryPage