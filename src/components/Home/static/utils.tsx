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
      icon: <span className="w-5 h-5 inline-block"><FaceBook/></span>
    },
    {
      name: "Instagram", 
      icon: <span className="w-5 h-5 inline-block"><InstagramIcon/></span>
    },
    {
      name: "LinkedIn",
      icon: <span className="w-5 h-5 inline-block"><LinkedInIcon/></span>
    },
    {
      name: "YouTube",
      icon:<span className="w-5 h-5 inline-block"><Youtube/></span>
    },
    {
      name: "Twitter",
      icon: <span className="w-5 h-5 inline-block"><Twiter/></span>
    },
    {
      name: "TikTok",
      icon:<span className="w-5 h-5 inline-block"><Tiktok/></span>
    }
]