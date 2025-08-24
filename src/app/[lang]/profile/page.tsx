import Profiles from '@/components/Profile/ProfileOptions.view'
import TopSection from '@/components/Profile/TopSection.view'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
        <div className='relative'>
           <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[256px] absolute left-0 bottom-[-15px]`}></div>
          <div className="container mx-auto px-4 pt-16 pb-12 ">
           <div className="text-center max-w-4xl mx-auto">
             <h1 className="font-bengali text-[45px] md:text-[52px] font-bold text-white mb-6 leading-tight">
               শ্রোতার প্রোফাইল
             </h1>
             <p className="font-bengali text-2xl md:text-4xl text-white/90 font-normal leading-relaxed">
               শুনুন, শিখুন, বেড়ে উঠুন — প্রতিদিন!
             </p>
           </div>
         </div>
        </div>
        <div>
            <TopSection/>
            <div>
                <Profiles/>
            </div>
        </div>
    </div>
  )
}

export default page