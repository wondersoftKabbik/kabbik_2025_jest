'use client'
import { useAppDispatch, useAppSelector } from "@/store/store";
import { container } from "../ui/static/tailwind.classes";
import { siteConfig } from "@/config/config";
import { Delete, Edit, PlusIcon, Trash, Trash2 } from "lucide-react";
import BigVideoPlayerIcon from "@/svgs/BigVideoPlayer";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import WarningModal from "./WarningModal.view";
import { useEffect, useState } from "react";
import FoldersModal from "./FoldersModal.view";
import { createNewPlaylistFolders, getPlayListBooks, RemoveBooksFromPlaylist, updatePlaylistFolders } from "@/utils/apiServices";
import { PlaylistAudioBook } from "./static/myplaylist.type";
import { formatDateDDMMYY, formatTimePlus6 } from "@/helpers/commonFunction";
import Skeleton from "../Skeleton/Skeleton";
import EditFoldersModal from "./EditFoldersModal.view";
import { toast } from "react-toastify";
import { setPlaylistValue } from "@/store/slicers/PlaylistSlice";

export default function MyPlayList() {
  const user=useAppSelector(store=>store.user.userData);
  const [showWarningModal,setWarningModal]=useState(false);
  let [books,setbooks]=useState<PlaylistAudioBook[]>([])
  let [folders,setFolders]=useState<{[key:number | string]:string}>({});
  const [showFolderModal,setFolderModal]=useState(false);
  const [editFolderModal,setEditFoldersModal]=useState("");
  const [activeBooks,setActiveBooks]=useState<PlaylistAudioBook[]>([]);
  const [activeFolders,setActiveFolders]=useState('');
  const [tableloading,setTableLoading]=useState(false)
  const [editLoader,setEditLoader]=useState(false);
  const dispatch=useAppDispatch();
  // let folders=["আলোকিত ইসলাম","ব্রেইন বুস্টার","হুমায়ূন আহমেদ ","ভৌতিক","মোটিভেশনাল","রোমান্স"]


  const getPlaylistItems=async()=>{
    setTableLoading(true)
    setActiveFolders('')
    let result = await getPlayListBooks();
    setbooks(result.data);
    dispatch(setPlaylistValue(result.data));

    let foldersFromResult:{[key:number | string]:string}={};
    result.data?.forEach((item:PlaylistAudioBook,index:number)=>{
      if(index===0){
        setActiveFolders(item.folder_name)
      }
      foldersFromResult[item.folder_id]=item.folder_name
    })
    setFolders(foldersFromResult);
    setTableLoading(false);
  }

  useEffect(()=>{
    if(!books.length) return;
    let activeBooks=books.filter(item=>item.folder_name===activeFolders);
    setActiveBooks(activeBooks);
  },[activeFolders])

  useEffect(()=>{
    getPlaylistItems();
  },[])

  const handleEditSubmit=async(val:string)=>{
    setEditLoader(true)
    let result =await updatePlaylistFolders(editFolderModal,val);
    getPlaylistItems()
    setEditFoldersModal('')
    setEditLoader(false);
  }

  const AddNewFolder=async(val:string)=>{
    setEditLoader(true);
    let result = await createNewPlaylistFolders(val)
    await getPlaylistItems();
    if(result.success!=='false'){
      toast.success("New folders added successfully")
    }else{
      toast.error("Something went wrong");
    }
    setEditLoader(false)
  }

  const RemoveFromPlaylist=async(id:number|string)=>{
    let result =await RemoveBooksFromPlaylist(id)
    await getPlaylistItems();
    if(result.success===false){
      toast.error("Something Went wrong")
    }else{
      toast.success("Removed From playlist")
    }
  }

  return (
    <div className={' relative  mt-5'}>
      {/* Radial gradient background */}
      <div className={"flex  justify-around "+container('1280px')}>
        
        <figure>
          <img
            src="/assets/booksStack.png"
            className="max-w-[200px]"
          />
        </figure>
        <div>
          <div className="grid grid-cols-3 gap-[20px]">
            {
              Object.keys(folders).map(item=>(
                <button
                  className={`text-white relative border py-2 px-4 rounded-[4px] border-gray-300 hover_btn-gradient-1 ${folders[item]===activeFolders?' btn-gradient-1 ':'' }`}
                  onClick={()=>{setActiveFolders(folders[item])}}
                  key={folders[item]}
                >
                  {folders[item]}
                  <span onClick={()=>{setEditFoldersModal(item)}} className="absolute -top-1 right-0.5">
                    <Edit className="w-3 h3"/>
                  </span>
                </button>
              ))
            }
          </div>
          <div className="flex items-center mt-2 text-white gap-x-3">
            <figure>
              <img className="max-w-8 max-h-8" src={user?.image_url??siteConfig.defaultProfilePic}/>
            </figure>
            <p className="">{user?.full_name}</p>
            <p>• {books.length} টি অডিওবুক</p>
          </div>
        </div>
      </div>
      <div className="btn-gradient-2 py-0">
          <div className={container('1206px')+" flex justify-between items-center"}>
            <div className="flex items-center">
              <span className="w-12 h-12 inline-block mr-3">
                <BigVideoPlayerIcon/>
              </span>
              <img className="max-w-12" src={books?.[0]?.banner_path}/>
            </div>
            <div>
              <button className="text-white flex items-center gap-1 btn-gradient-3 py-2 px-4 rounded-[8px]" onClick={()=>{setFolderModal(true)}}>
                <PlusIcon className="text-white w-4"/>
                ক্রিয়েট নিউ প্লেলিস্ট
              </button>
            </div>
          </div>
          
      </div>
      <div className={container('1280px')+" "}>
        <div className=" pb-8 px-4 lg:px-12">
      <div className="max-w-[1449px] mx-auto relative ">
        {/* Table Header */}

        {/* Table Rows */}
        <table className="w-full border-collapse z-30 relative">
          {/* Table Head */}
          <thead>
            <tr className="text-gray-400  bg-white bg-opacity-10 text-cn text-left">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">টাইটেল</th>
              <th className="px-6 py-3">লেখক</th>
              <th className="px-6 py-3">তারিখ</th>
              <th className="px-6 py-3">সময়</th>
              <th className="px-6 py-3">অ্যাকশন</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {activeBooks.map((book, index) => (
              !book.audiobook_id?(
                <span key={index}>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                </span>
              ):
              <tr
                key={book.audiobook_id}
                className={`hover:bg-white/5`}
              >
                {/* Row Number */}
                <td className="px-6 py-0 text-gray-300 text-clg2 font-normal">
                  {book.audiobook_id === 10
                    ? '১০'
                    : ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'][book.audiobook_id - 1]}
                </td>

                {/* Title + Cover */}
                <td className="px-6 py-1 flex items-center gap-4 max-w-[300px]">
                  <img
                    src={book.banner_path}
                    alt={book.name}
                    className="w-[51px] h-[60px] object-cover rounded"
                  />
                  <span className="text-white text-cn leading-tight">
                    {book.name}
                  </span>
                </td>

                {/* Author */}
                <td className="px-6 py-1 text-gray-300 text-cn leading-tight">
                  {book.author_name}
                </td>

                {/* Date */}
                <td className="px-6 py-1 text-gray-400 text-cn">
                  {formatDateDDMMYY(book.created_at)}
                </td>

                {/* Time */}
                <td className="px-6 py-1 text-gray-400 text-cn">
                  {/* {book.time} */}
                  {formatTimePlus6(book.created_at)}
                </td>

                {/* Action */}
                <td className="px-6 py-1">
                  <button
                    onClick={() => RemoveFromPlaylist(book.playlist_book_id)}
                    className="bg-red-500/20 hover:bg-red-600/20 text-white rounded p-2 flex items-center justify-center"
                  >
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="circular_gradient right-[-40%] top-[-10%] w-[30vw] h-[30vw] absolute  "></div>
        <div className="circular_gradient left-[-20%] bottom-[-10%] w-[30vw] h-[30vw] absolute  "></div>
      </div>
     </div>
      </div>
      <div className="bg-deep-blue text-white px-4 py-8 md:px-8">
      {/* <div className={container("1320px")}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center h-4">
            <h1 className="text-[24px] font-bold text-white">Recommended</h1>
          </div>

          <div className="grid grid-cols-5 justify-center lg:justify-start gap-6 lg:gap-12 xl:gap-16 2xl:gap-[81px]">
            {books.map((book) => (
              <div
                key={book.audiobook_id}
                className={`w-[209px] h-[312px] rounded-lg relative transition-all duration-300 hover:scale-105 ${
                  false
                    ? "border border-green-glow shadow-[0_-2px_36px_0_#0BBA0B]"
                    : "border border-card-border"
                } bg-deep-blue`}
              >
                <div className="p-4">
                  <img
                    src={book.banner_path}
                    alt={`Book ${book.audiobook_id}`}
                    className="w-[177px] h-[236px] object-cover rounded"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <button className="w-[177px] h-[30px] bg-transparent border border-button-border rounded-md text-white text-[14px] font-normal hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center px-3">
                    প্লেলিস্ট যোগ করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
      <CommonModal
        isOpen={showWarningModal}
        onClose={()=>setWarningModal(false)}
      >
        <WarningModal/>
      </CommonModal>
      <CommonModal
        isOpen={showFolderModal}
        onClose={()=>setFolderModal(false)}
      >
        <FoldersModal loader={editLoader} AddNewFolder={AddNewFolder} folders={folders}/>
      </CommonModal>
      <CommonModal
        isOpen={editFolderModal?true:false}
        onClose={()=>setEditFoldersModal('')}
      >
        <EditFoldersModal
          folderName={folders[editFolderModal]}
          onSubmit={handleEditSubmit}
          loading={editLoader}
        />
      </CommonModal>
    </div>
  );
}

// Book Stack Component




