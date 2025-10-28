
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
    my_courses:'/profile/my-courses',
    reward_point:'/profile/reward-point',
    store:'/store',
    podcast:'/পডকাস্ট',
    terms_condition:'/terms&condition',
    privacy_policy:'/privacy-policy',
    returnpolicy:'/returnpolicy',
    searchBooks:'/search',
    authors:'/author/',
    cast:'/cast/',
    refer_earn:'/profile/refer-earn',
    refer_dashboard:`/profile/refer-earn/dashboard`
    // home:'',

}