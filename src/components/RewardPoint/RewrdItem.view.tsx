import React from 'react'

interface RewardItemProps {
  icon: React.ReactNode;
  title: string;
  points: string;
}

const RewrdItem = ({ icon, title, points }: RewardItemProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12">
      <div className="flex items-center gap-3 md:gap-4 flex-1 w-full">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="text-white text-lg md:text-2xl lg:text-[36px] font-bold underline leading-tight">
            {title}
          </div>
          <div className="text-white text-lg md:text-2xl lg:text-[36px] font-bold underline leading-tight">
            {points}
          </div>
        </div>
      </div>
      <button className="flex-shrink-0 px-8 md:px-12 lg:px-20 py-4 md:py-6 rounded-[14px] bg-gradient-to-l from-[#EEBFBE] via-[#FFDAD9] to-[#FFDAD9] text-[#AD4142] text-lg md:text-2xl lg:text-[36px] underline hover:opacity-90 transition-opacity whitespace-nowrap">
        সংগ্রহ করুন
      </button>
    </div>
  )
}

export default RewrdItem