import BellIcon from "@/svgs/BellIcon";
import BookMarkIcon from "@/svgs/BookMarkIcon";
import DownloadIconWithBg from "@/svgs/DownloadIconWithBg";
import Eight from "@/svgs/Eight";
import FaceBook from "@/svgs/FaceBook";
import Five from "@/svgs/Five";
import FolderWithBgIcon from "@/svgs/FolderWithBg";
import Four from "@/svgs/Four";
import InstagramIcon from "@/svgs/InstagramIcon";
import LinkedInIcon from "@/svgs/LinkedInIcon";
import LoveIconWithBg from "@/svgs/LoveIconWithBg";
import Nine from "@/svgs/Nine";
import One from "@/svgs/One";
import Seven from "@/svgs/Seven";
import ShareIconWithBg from "@/svgs/ShareIconWithBg";
import Six from "@/svgs/Six";
import Ten from "@/svgs/Ten";
import Three from "@/svgs/Three";
import Tiktok from "@/svgs/Tiktok.svg";
import Twiter from "@/svgs/Twiter.svg";
import TwoIcon from "@/svgs/Two";
import Youtube from "@/svgs/Youtube.Icon";
import { Heading } from "lucide-react";
import React from "react";

export const OneToTen:{ [key: string]: JSX.Element }={
    "1":<One/>,
    "2":<TwoIcon/>,
    "3":<Three/>,
    "4":<Four/>,
    "5":<Five/>,
    "6":<Six/>,
    "7":<Seven/>,
    "8":<Eight/>,
    "9":<Nine/>,
    "10":<Ten/>
}

export const IconsForSteps = [
    <FolderWithBgIcon key={1} />,
    <BellIcon key={2} />,
    <LoveIconWithBg key={3} />,
    <DownloadIconWithBg key={4} />,
    <BookMarkIcon key={5} />,
    <ShareIconWithBg key={6} />,
    <FolderWithBgIcon key={7} />,
    <LoveIconWithBg key={8} />,
    <DownloadIconWithBg key={9} />,
];

export const StepsBySteps={
    heading:"ধাপে ধাপে কীভাবে বই শুনবেন",
    datas:[
        "অ্যাকাউন্ট তৈরি করুন / লগইন করুন",
        "সাবস্ক্রাইব করুন এক্সপ্লোর করুন ও জানুন",
        "আপনার পছন্দের বই খুঁজে বের করুন",
        "বইটি ডাউনলোড করুন বা স্ট্রিম করুন",
        "বুকমার্ক ও ডাউনলোড ব্যবহার করুন",
        "বন্ধুদের রেফার করুন ও পুরস্কার জিতুন!"
    ]
}

export const footer=[
    {
      name: "Facebook",
      link:'https://www.facebook.com/kabbikAudiobookOfficial',
      icon: <span className="w-5 h-5 inline-block"><FaceBook/></span>
    },
    {
      name: "Instagram", 
      link:'https://www.bing.com/ck/a?!&&p=d91c54be54d78d17265928b41fe4f4133cb4e02e60c1216982572c441d96fd6eJmltdHM9MTc2MjA0MTYwMA&ptn=3&ver=2&hsh=4&fclid=09899d99-39ba-6d53-0355-884738e06ce3&psq=kabbik+instagram&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9rYWJiaWthdWRpb2Jvb2tvZmZpY2lhbC8',
      icon: <span className="w-5 h-5 inline-block"><InstagramIcon/></span>
    },
    {
      name: "LinkedIn",
      link:'https://www.linkedin.com/company/kabbikaudiobookofficial/',
      icon: <span className="w-5 h-5 inline-block"><LinkedInIcon/></span>
    },
    {
      name: "YouTube",
      link:'https://www.youtube.com/@kabbikAudiobookOfficial',
      icon:<span className="w-5 h-5 inline-block"><Youtube/></span>
    },
    {
      name: "Twitter",
      link:'https://x.com/kabbikOfficial',
      icon: <span className="w-5 h-5 inline-block"><Twiter/></span>
    },
    {
      name: "TikTok",
      link:'https://www.tiktok.com/@kabbik_audiobook',
      icon:<span className="w-5 h-5 inline-block"><Tiktok/></span>
    }
]


export type ReelsType = {
    id: number; // unique identifier
    reelInfo: {
        url: string; // Video url
        type: string; // Type of the video
        description?: string; // Description of the video
        postedBy?: {
            avatar: string; // Image Url of Avatar 
            name: string; // Name of the uploader
        };
        likes?: {
            count: number; // number of likes
        };
        dislikes?: {
            count: number; // number of dislikes
        };
        comments?: {
            count: number; // number of comments
        };
        shares?: {
            count: number; // number of shares
        }; 
    }
    rightMenu?: { // Right Three dot menu
        options: Array<{ // each option
            id: number; // unique identifier
            label: string; // display label
            value: string; // actual value
        }>
    };
    bottomSection?: { // If Custom Component is used for Avatar, description etc instead of default
        component: JSX.Element; // Any HTML or JSX Element
    };
}

export interface ReelInfo {
  url: string;
  description: string;
    thumb:string;
  reel_youtube_id:string;
}

// Type for the whole reel object
export interface ReelType {
  id: string;
  reelInfo: ReelInfo;
  facebook_url?:string;
}