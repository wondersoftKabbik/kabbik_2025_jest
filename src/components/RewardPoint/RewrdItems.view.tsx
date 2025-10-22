import React from 'react'



const RewrdItems = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center my-4">
            <p className="font-semibold text-cn2 md:text-clg2">কার্যকর রিওয়ার্ডস</p>
            <button className="text-cn md:text-clg">সবগুলো দেখুন</button>
        </div>
        {/* Rewards List */}
            <div className="space-y-4">
                {/* Reward 1 */}
                <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">
                <div className='flex items-center  gap-2'>
                    <figure className='bg-[#feded9] max-w-12 max-h-12 rounded-[50%] p-1'>
                        <img className='max-w-11 max-h-11 object-cover rounded-[4px]' src={'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/reward-recharge.png'}/>
                    </figure>
                    <div>
                        <p className="text-cs sm:text-cs2 md:text-cn font-medium">২০ টাকা মোবাইল রিচার্জ</p>
                        <p className="text-cs sm:text-cs2 md:text-cn opacity-80">৬০০ পয়েন্ট</p>
                    </div>
                </div>
                <button className="bg-[#F2B5C2] text-black px-4 py-1.5 rounded-[4px] text-cs sm:text-cs2 md:text-cn font-medium">
                    সংরক্ষন করুন
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RewrdItems