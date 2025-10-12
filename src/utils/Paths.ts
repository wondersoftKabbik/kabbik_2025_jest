
export const paths={
    book_details:(id:string|number)=>`/audiobook/${id}`,
    categoryWiseBooks:(category:string)=>`/${category}`,
    upcoming:"/upcoming",
    profile:'/profile',
    notification:'/notification',
    myPlayList:'/my-playlist',
    playlist_search:'/my-playlist/search',
    subscribe:'/subscribe',
    favorites:'/profile/favorites',
    my_rents:'/profile/my-rents',
    my_courses:'/profile/my-courses'
}