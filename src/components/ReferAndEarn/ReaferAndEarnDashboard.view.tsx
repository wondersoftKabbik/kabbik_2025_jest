'use client'
import { siteConfig } from '@/config/config';
import { formatDateToBengali } from '@/helpers/commonFunction';
import { useAppSelector } from '@/store/store'
import Claims from '@/svgs/claims.svg';
import ClockIcon2 from '@/svgs/Clock.svg';
import GitIcon from '@/svgs/git.svg';
import Pending from '@/svgs/Pending.svg';
import SuccessTransaction from '@/svgs/SuccessTransaction.view';
import Image from 'next/image'
import React from 'react'

const ReaferAndEarnDashboard = () => {
    const user = useAppSelector(store=>store?.user?.userData);

  return (
    <div className=" text-gray-800 px-4 py-8 sm:px-8 sm:py-12">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        <div className="profile_earn_gradients rounded-[8px] p-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 shadow-lg">
          {/* Left: avatar + name */}
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <Image src={siteConfig.defaultPremiumPic} alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">{user?.full_name}</h2>
              <p className="text-white/90 text-sm">সদস্য {formatDateToBengali(user?.created_at??'')} থেকে</p>
            </div>
          </div>

          {/* Center pills: three small cards */}
          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 px-2">
            <div className="bg-white/90 rounded-[6px] px-5 py-2 shadow-sm flex items-center gap-3 min-w-[170px]">
              <div className="w-9 h-9 text-white/90 flex items-center justify-center">
                <GitIcon/>
              </div>
              <div>
                <p className="font-semibold">XXXXXX</p>
              </div>
            </div>

            <div className="bg-white/90 rounded-[6px] px-2 py-2 shadow-sm flex items-center gap-1 min-w-[170px]">
              <div className="w-9 h-9  text-white/90 flex items-center justify-center">
                <ClockIcon2/>
              </div>
              <div>
                <p className="font-semibold">পেমেন্ট হিস্ট্রি</p>
              </div>
            </div>
          </div>

          {/* Right: small payment card */}
          <div className="flex-0">
            <div className="bg-white/90 rounded-xl p-3 w-52 text-center shadow-md">
              <p className="text-xs text-gray-500">আপনার মোট আয়</p>
              <p className="text-xl font-bold mt-1">৳১১০০</p>
              <small> ৳১০০০-এর কম পরিমাণ আয় 
                আপনি ক্লেইম করতে পারবেন না</small>
              <button className="mt-3 w-full bg-red-600 text-white/90 text-sm py-1 rounded">উইথড্র</button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl sm:text-clg2 text-white/90 font-semibold mb-2">রেফারেল অ্যাওয়ার্ড ক্রেইমস হিস্ট্রি</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              আপনার সকল রেফারেল রিওয়ার্ড এবং তাদের বর্তমান অবস্থা ট্র্যাক করুন
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/90 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl"><Claims/></div>
              <div>
                <h4 className="text-sm text-gray-500">টোটাল ক্লেইমস</h4>
                <p className="text-clg font-bold ">২৪টি ক্লেইমস</p>
              </div>
            </div>

            <div className="bg-white/90 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl"><SuccessTransaction/></div>
              <div>
                <h4 className="text-sm text-gray-500">সফল ক্লেইমস</h4>
                <p className="text-clg font-bold ">১৮টি ডেলিভার্ড</p>
              </div>
            </div>

            <div className="bg-white/90 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center text-2xl"><Pending/></div>
              <div>
                <h4 className="text-sm text-gray-500">টোটাল ক্লেইমস</h4>
                <p className="text-clg font-bold ">২৪টি ক্লেইমস</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <select className="bg-[#0e142a] text-white/90 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
            <option>সব স্ট্যাটাস</option>
            <option>ডেলিভার্ড</option>
            <option>পেন্ডিং</option>
            <option>ক্যানসেল</option>
          </select>
          <input
            type="text"
            placeholder="তারিখ অনুসন্ধান"
            className="bg-[#0e142a] border border-white/10 text-white/90 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#6A49FF] px-4 py-2 rounded-lg hover:bg-[#5A3FFF] transition">🔍 খুঁজুন</button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-6 rounded-lg">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-white/90 text-black">
                <th className="text-left px-4 py-3 font-medium rounded-tl-md">ক্রেইম আইডি</th>
                <th className="text-left px-4 py-3 font-medium">তারিখ</th>
                <th className="text-left px-4 py-3 font-medium">অ্যাওয়ার্ড টাইপ</th>
                <th className="text-left px-4 py-3 font-medium">পরিমাণ</th>
                <th className="text-left px-4 py-3 font-medium rounded-tr-md">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-[#071022]">
              {[
                { id: "REF-2020-005", date: "১৫ ডিসেম্বর, ২০২০", type: "রেফার রিওয়ার্ড", amount: "৳৫০.০০", status: "ডেলিভার্ড", color: "bg-green-700" },
                { id: "REF-2020-006", date: "১৬ ডিসেম্বর, ২০২০", type: "রেফার রিওয়ার্ড", amount: "৳৫০.০০", status: "পেন্ডিং", color: "bg-yellow-600" },
                { id: "REF-2020-007", date: "১৭ ডিসেম্বর, ২০২০", type: "রেফার রিওয়ার্ড", amount: "৳৫০.০০", status: "ক্যানসেল", color: "bg-red-700" },
                { id: "REF-2020-008", date: "১৮ ডিসেম্বর, ২০২০", type: "রেফার রিওয়ার্ড", amount: "৳৫০.০০", status: "ডেলিভার্ড", color: "bg-green-700" },
                { id: "REF-2020-009", date: "১৯ ডিসেম্বর, ২০২০", type: "রেফার রিওয়ার্ড", amount: "৳৫০.০০", status: "Pending", color: "bg-yellow-500" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-[#0c1224] text-white/90 transition">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm ${item.color}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-3 mt-6">
          <button className="p-2 rounded-full bg-[#0e142a] hover:bg-[#1a2040]">←</button>
          <button className="w-9 h-9 rounded-full bg-blue-600 text-white/90 flex items-center justify-center">১</button>
          <button className="w-9 h-9 rounded-full bg-[#0e142a] text-white/90 flex items-center justify-center">২</button>
          <button className="w-9 h-9 rounded-full bg-[#0e142a] text-white/90 flex items-center justify-center">৩</button>
          <button className="p-2 rounded-full bg-[#0e142a] hover:bg-[#1a2040]">→</button>
        </div>

        {/* Footer Note */}
        <p className="text-gray-400 text-center text-sm mt-4">
          ২৪টি ক্রেইমস এর ৫-টি প্রদর্শন করা হয়েছে মাত্র
        </p>
      </div>
    </div>
  )
}

export default ReaferAndEarnDashboard