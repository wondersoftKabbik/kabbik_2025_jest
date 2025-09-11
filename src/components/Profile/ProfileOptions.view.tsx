'use client'
import React from 'react';
import BookIcon from '@/svgs/bookIcon';
import LoveIcon from '@/svgs/LoveIcon';
import { Delete, GraduationCap, HandshakeIcon, InfoIcon, LogOut, PersonStandingIcon, StarIcon } from 'lucide-react';
import PlayIcon from '@/svgs/PlayIcon.svg';
import UserIcon from '@/svgs/UserIcon';
import TakaIcon from '@/svgs/TakaIcon.svg';
import DownloadIconWithBg from '@/svgs/DownloadIconWithBg';
import MyPlayList from '@/svgs/MyPlayList.svg';
import { cn } from '@/lib/utils';
import { clearSessionAndRedirect } from '@/helpers/commonFunction';

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  hasNewBadge?: boolean;
  className?: string;
  handleClick?:()=>void
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, gradient, hasNewBadge, className,handleClick }) => {
  return (
    <div onClick={()=>handleClick?handleClick():''} className={cn('relative cursor-pointer', className)}>
      <div className="profile_btn_gradients rounded-xl p-2">
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              'w-[36px] h-[36px] rounded-lg flex text-white items-center justify-center',
              gradient
            )}
          >
            {icon}
          </div>
          <h3 className="text-white text-cn font-semibold flex-1">{title}</h3>
        </div>
      </div>

      {hasNewBadge && (
        <div className="absolute -top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-md">
          নতুন
        </div>
      )}
    </div>
  );
};

export default function Profiles() {
  const menuItems = [
    // Row 1
    { title: 'বইয়ের অনুরোধ', icon: <BookIcon color="white" />, gradient: 'bg-blue-gradient', hasNewBadge: true },
    { title: 'রিডিম কোড', icon: <LoveIcon />, gradient: 'bg-red-gradient' },
    { title: 'পছন্দের তালিকা', icon: <PlayIcon />, gradient: 'bg-green-gradient' },

    // Row 2
    { title: 'রেন্ট বুক', icon: <UserIcon />, gradient: 'bg-purple-gradient', hasNewBadge: true },
    { title: 'রেফার অ্যান্ড আর্ন', icon: <TakaIcon />, gradient: 'bg-orange-gradient' },
    { title: 'আমার কোর্স', icon: <GraduationCap />, gradient: 'bg-green-gradient', hasNewBadge: true },

    // Row 3
    { title: 'ডাউনলোড', icon: <DownloadIconWithBg />, gradient: 'bg-red-gradient' },
    { title: 'স্পনসরশিপ', icon: <HandshakeIcon />, gradient: 'bg-yellow-gradient' },
    { title: 'অ্যাকাউন্ট ডিঅ্যাকটিভেট', icon: <Delete />, gradient: 'bg-purple-gradient' },

    // Remaining items (to be shown in a single horizontal row)
    { title: 'আমার প্লে-লিস্ট', icon: <MyPlayList />, gradient: 'bg-teal-gradient' },
    { title: 'অ্যাবাউট আস', icon: <InfoIcon />, gradient: 'bg-blue-gradient' },
    { title: 'কন্ট্যাক্ট আস', icon: <PersonStandingIcon />, gradient: 'bg-purple-gradient' },
    { title: 'রেটিং', icon: <StarIcon />, gradient: 'bg-red-gradient' },
    { title: 'লগ আউট', icon: <LogOut />, gradient: 'bg-green-gradient',handleClick:clearSessionAndRedirect }
  ];

  const firstNine = menuItems.slice(0, 9);
  const remainder = menuItems.slice(9);

  return (
    <div className=" p-4">
      <div className="max-w-6xl mx-auto">
        {/* 3 columns x 3 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {firstNine.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              icon={item.icon}
              gradient={item.gradient}
              hasNewBadge={item.hasNewBadge}
            />
          ))}
        </div>

        {/* Remaining items in a single horizontal row */}
        {remainder.length > 0 && (
          <div className="mt-6">
            <div className="my">
              {remainder.map((item, idx) => (
                <div key={idx} className="w-full my-3 flex-shrink-0">
                  <MenuItem
                    title={item.title}
                    icon={item.icon}
                    handleClick={item.handleClick}
                    gradient={item.gradient}
                    hasNewBadge={item.hasNewBadge}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
