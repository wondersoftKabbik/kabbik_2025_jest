import { BookOpen } from "lucide-react";
import { castCrewInfo } from "./static/audiobook.type";
import BookIcon from "@/svgs/bookIcon";

// interface Author {
//   id: string;
//   name: string;
//   audioBookCount: number;
//   image: string;
// }

// const authors: Author[] = [
//   {
//     id: "1",
//     name: "শোয়াইব আহমদ",
//     audioBookCount: 48,
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
//   },
//   {
//     id: "2", 
//     name: "পিংকি সুস্মিতা ঘাগ্রা",
//     audioBookCount: 11,
//     image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face"
//   },
//   {
//     id: "3",
//     name: "আহসানুল ইসলাম", 
//     audioBookCount: 10,
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
//   },
//   {
//     id: "4",
//     name: "মুহাঃ ফেরদৌস করিম তমাল",
//     audioBookCount: 10,
//     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&crop=face"
//   }
// ];

export default function CastAndCrew(props: { castCrewData: castCrewInfo[]  }) {
  const { castCrewData } = props;
  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col gap-[27px]">
          {castCrewData?.map((author) => (
            <div
              key={author.id}
              className=" w-full rounded-xl bg-white shadow-[0_1px_4px_1px_rgba(0,0,0,0.25)] flex items-center px-[15px] py-[7px]"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0 mr-[25px]">
                <img
                  src={author.imageUrl ?? 'https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/manPlaceholder.jpg'}
                  alt={author.name}
                  className="w-[68px] h-[68px] rounded-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Author Name */}
                <div className="mb-1">
                  <span className="text-black text-[18px] sm:text-[22px] lg:text-[24px] font-medium  font-inter block truncate">
                    {author.name}
                  </span>
                </div>
                
                {/* Audiobook Count */}
                <div className="flex items-center gap-[3.834px] mt-2">
                  <span className="w-[12px] h-[15px] ">
                    <BookIcon  />
                  </span>
                  <span className="text-black text-[14.378px] font-medium leading-[9.585px] font-inter">
                    {author.total_audiobooks} অডিওবুক
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
