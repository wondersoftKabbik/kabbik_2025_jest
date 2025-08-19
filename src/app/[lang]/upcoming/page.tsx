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
           <div>
                <div className="min-h-screen bg-navy-dark">
      {/* Header Section */}
                    <div className="pt-8 lg:pt-16 pb-8 lg:pb-12 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-white font-bengali font-bold text-3xl sm:text-4xl lg:text-[60px] mb-4 lg:mb-6 leading-tight">
                            আপকামিং বুক
                        </h1>
                        <p className="text-white font-bengali text-lg sm:text-xl lg:text-[42px] font-normal leading-tight lg:leading-[50.4px]">
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