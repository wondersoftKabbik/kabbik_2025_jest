import BellIcon from "@/svgs/BellIcon";
import BookMarkIcon from "@/svgs/BookMarkIcon";
import DownloadIconWithBg from "@/svgs/DownloadIconWithBg";
import Eight from "@/svgs/Eight";
import Five from "@/svgs/Five";
import FolderWithBgIcon from "@/svgs/FolderWithBg";
import Four from "@/svgs/Four";
import LoveIconWithBg from "@/svgs/LoveIconWithBg";
import Nine from "@/svgs/Nine";
import One from "@/svgs/One";
import Seven from "@/svgs/Seven";
import ShareIconWithBg from "@/svgs/ShareIconWithBg";
import Six from "@/svgs/Six";
import Ten from "@/svgs/Ten";
import Three from "@/svgs/Three";
import TwoIcon from "@/svgs/Two";
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

export const IconsForSteps=[
    <FolderWithBgIcon/>,
    <BellIcon/>,
    <LoveIconWithBg/>,
    <DownloadIconWithBg/>,
    <BookMarkIcon/>,
    <ShareIconWithBg/>,
    <FolderWithBgIcon/>,
    <LoveIconWithBg/>,
    <DownloadIconWithBg/>,
]

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