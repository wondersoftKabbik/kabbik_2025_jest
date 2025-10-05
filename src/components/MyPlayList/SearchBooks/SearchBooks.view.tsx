'use client'
import CommonModal from "@/components/ui/CommonModal/CommonModal.view";
import Categories from "./Categories.view";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AudioIcon from "@/svgs/audioIcon.svg";
import { Search } from "lucide-react";
import { getPlayListBooks, postSearch } from "@/utils/apiServices";
import { TAudioBookDetails } from "@/components/audiobook/static/audiobook.type";
import { container } from "@/components/ui/static/tailwind.classes";
import { AudiobookCard } from "@/components/CategoryWiseBooks/AudioBookCard.view";
import { TBooks } from "@/pageTypes/home.types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setPlaylistValue } from "@/store/slicers/PlaylistSlice";

export default function SearchBooks() {
  const [showCategories,setShowCategories]=useState(false);
   const searchParams = useSearchParams();
   let folders=searchParams.get('folders')
   const [searchText,setSearchText]=useState('');
   let [books,setBooks]=useState<TBooks[]>([]);
   const dispatch=useAppDispatch();
   const playListData=useAppSelector(store=>store.playList.playlistData)
  //  a mapper key:value format for tracking books allready are in playlist
   const [playListBooks,setPlaylistBooks]=useState<{[key:number|string]:string}>({});


   const submitSearch=async(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      let result = await  postSearch(searchText);
      setBooks(result.data);
    }
   }

    const getPlaylistItems=async()=>{
      let result = await getPlayListBooks();
      dispatch(setPlaylistValue(result.data));
  
    }

    useEffect(()=>{
      if(playListData.length){
        return
      }
      getPlaylistItems();
    },[])

    useEffect(()=>{
      if(!playListData.length)return;
      let playListBookMapper:{[key:number|string]:string}={};
      playListData.forEach((book)=>{
        playListBookMapper[book.audiobook_id]=book.name;
      })
      setPlaylistBooks(playListBookMapper);
    },[playListData.length])

    const handleAddToBookList=(id:number|string,name:string)=>{
      let newPlaylistBooks={...playListBooks};
      newPlaylistBooks[id]=name;
      setPlaylistBooks(newPlaylistBooks);
    }

  return (
    <div>
      <div className="z-30 relative  flex items-center justify-center px-2 py-4">
      <div className="w-full max-w-[279px] flex flex-col items-center">
        {/* Music Note Icon */}
        <div className="flex h-[77px] pb-[15px] items-start justify-center mb-2 sm:mb-0">
          <AudioIcon/>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-3 sm:gap-[15px] w-full">
          {/* Headlines */}
          <div className="flex flex-col items-center gap-1 sm:gap-[7px] w-full">
            <div className="text-center px-2">
              <span className="text-white text-base sm:text-lg md:text-[15px] font-normal leading-relaxed">
                চলো তোমার প্লেলিস্টের জন্য কিছু খুঁজে বের করি
              </span>
            </div>
            <div className="text-center px-2">
              <span className="text-[#A0A0A0] text-xs sm:text-sm md:text-[13px] font-normal leading-normal">
                বই খুঁজুন 
              </span>
            </div>
          </div>

          {/* Search and Button Section */}
          <div className="flex flex-col items-center gap-3 sm:gap-[15px] w-full max-w-[229px] px-2">
            {/* Search Bar */}
            <div className="flex items-center w-full border border-gray-400  rounded-[4px] px-2 sm:px-2.5 py-1">
              <div className="flex  items-center w-full">
                <Search size={'20'} className="text-muted2"/>
                <div className="flex-1 ml-1 sm:ml-2">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e)=>{setSearchText(e.target.value)}}
                    onKeyDown={submitSearch}
                    placeholder="সার্চ ফর ক্যাটাগরিস"
                    className="w-full  z-30 bg-transparent text-[#A0A0A0] text-xs sm:text-[12px] font-normal placeholder-[#A0A0A0] border-none outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Browse Categories Button */}
            <button onClick={()=>{setShowCategories(true)}} className="w-full max-w-[182px] h-[25px] sm:h-[30px] bg-white rounded-full flex items-center justify-center px-2 sm:px-3 hover:bg-gray-100 transition-colors">
              <span className="text-[#121212] text-xs sm:text-[12px] font-normal">
                ব্রাউজ ক্যাটাগরিস
              </span>
            </button>
          </div>
          
        </div>
      </div>
      
      <CommonModal
        isOpen={showCategories}
        onClose={()=>{setShowCategories(false)}}
      >
        <Categories folders={folders??''}/>
      </CommonModal>
    </div>
    <div className={`${container('1209px')} relative`}>
       {/* <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
       <div className="circular_gradient right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div> */}
       <div className="mt-10  grid grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
         {books?.length ? books?.map((audiobook) => (
           <AudiobookCard 
             key={audiobook.id} 
             category={''}
             audiobook={audiobook}
             className="max-w-sm mx-auto"
             isInPlayList={playListBooks[audiobook.id]}
             handleAddToBookList={handleAddToBookList}
           />
         )):''}
       </div>
    </div>
    </div>
  );
}
