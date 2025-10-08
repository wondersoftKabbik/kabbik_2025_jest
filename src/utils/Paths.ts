
export const paths={
    book_details:(id:string|number)=>`/audiobook/${id}`,
    categoryWiseBooks:(category:string)=>`/${category}`,
    upcoming:"/upcoming",
    profile:'/profile',
    notification:'/notification',
    myPlayList:'/my-playlist',
    playlist_search:'/my-playlist/search',
    subscribe:'/subscribe'
}