
import PageNotFound from "@/components/ui/NotFound.view";
import { audioBookDetails } from "@/utils/server-api";
import  {RatingReviewInfo, AuthorInfo, castCrewInfo, PageProps } from "@/components/audiobook/static/audiobook.type";
import { authorDetails, castDetails, ratingReviewList } from "@/utils/apiServices";
import { getDictionary } from "../../dictionaries";
import GradientAudioPlayer from "@/components/ui/AudioPlayer.view";
import AudiobookComponent from "@/components/audiobook/BookDetails.view";

export const metadata = {
  title: "Audiobook details | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

const Audiobook = async(params: {
  params: { id: string;   };
  // lang: 'en' | 'bl';
  searchParams: { episodeId: string; time: string };
}) => {
  const bookId = parseInt(await params.params.id);
  const episodeId = parseInt(params.searchParams.episodeId);
  const time = parseInt(params.searchParams.time);
  const audiobookData: any = await audioBookDetails(bookId);
  const authorName = audiobookData.author_name;
  const authorData: PageProps['authorDetailsData'] = await authorDetails(authorName);
  const castName = audiobookData.contributing_artists;
  const castData: {data:castCrewInfo[]} = await castDetails(castName);
  const reviewData: {data:RatingReviewInfo[]} = await ratingReviewList(bookId);
  // const { lang } =  await params;
  // const dict = await getDictionary(lang) 
  const doesAudiobookExist = audiobookData.success === "false";
  console.log(castData,"castData")
  
  return (
    <>
      {doesAudiobookExist ? (
        <PageNotFound />
      ) : (
        <AudiobookComponent
          audiobookData={audiobookData}
          bookId={bookId}
          authorDetailsData={authorData}
          castData={castData}
          reviewDetailsData={reviewData}
          episodeId={episodeId}
          runningTime={time}
        />
      )}
            

    </>
  );
};

export default Audiobook;
