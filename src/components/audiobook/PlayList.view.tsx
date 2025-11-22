import React from 'react'
import { TAudioBookDetails, TEpisode } from './static/audiobook.type';
import PremiumCrownIcon from '@/svgs/PremiumIcon';
import Crown from '@/svgs/Crown.svg';
import LockIcon from '@/svgs/LockIcon.svg';
import PlayIcon from '@/svgs/PlayIcon';
import PauseIcon from '@/svgs/PauseIcon';
import { audioBookDetails } from '@/utils/server-api';
import WhitePlayer from '@/svgs/WhitePlayer.svg';

const PlayList = ({book,hasAccess,togglePlay,index,isPlaying}:{book:TAudioBookDetails,hasAccess:(val:number)=>boolean,togglePlay:(i:number,id:number)=>void,index:number,isPlaying:boolean}) => {

    
  return (
    <div>
        <div className="max-h-[514px] px-2 overflow-y-auto">
          {book?.episodes?.map((episode,i) => (
            <div key={episode.id} className=" my-2 btn-gradient-2 cursor-pointer rounded-[6px] px-3 md:px-4 py-2 shadow-lg">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex relative items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <img
                    src={book.thumb_path}
                    className="w-12 h-14 md:w-16 md:h-18 rounded-md object-cover flex-shrink-0"
                  />
                    <div className="w-8 z-50 absolute top-[10px] left-[10px] h-8 md:w-10 md:h-10" onClick={()=>togglePlay(i,episode.id)}>
                      {hasAccess(episode.id) ? (
                        isPlaying && index === i ? <PauseIcon  /> : <><WhitePlayer  /></>
                      ) : <LockIcon  color='white' />}
                    </div>
                  <div>
                    <h3 className="text-cs md:text-cn text-white font-normal min-w-0 leading-tight">
                        {episode?.name}
                    </h3>
                    <p className='text-cs md:text-cs2 text-white'>
                        লেখক: {book?.author_name}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PlayList