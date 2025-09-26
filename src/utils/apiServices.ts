import Cookies from "js-cookie";
import { apiEndPoints } from "./apiEndpoints";
import { toast } from "react-toastify";
// import { formatTime, showToast } from "";
import { BlogInfo, DynamicSubscriptionPack, TMethods, TtoastType } from "@/helpers/commonTypes";
import { formatTime, normalizeMsisdn, showToast } from "@/helpers/commonFunction";
import { CommonApiHandler, getHeaders } from "./CommonApicalls";

export const subscriptionPack = async (id: any) => {
  const url = `${apiEndPoints.packDetailsApi}${id}`;
 return await CommonApiHandler(
    {
      name: "subscriptionPack",
      url,
      method: TMethods.GET,
    }
 )
};

export const getNotifications = async (userId:number,page:number) => {
  const url = `${apiEndPoints.notificationGetUrl}?userId=${userId}&page=${page}&limit=15`;
 return await CommonApiHandler(
    {
      name: "getNotifications",
      url,
      method: TMethods.GET,
    }
 )
};

export const unreadNotificationCount = async (userId:number) => {
  const url = `${apiEndPoints.unreadCount}?userId=${userId}`;
 return await CommonApiHandler(
    {
      name: "unreadNotificationCount",
      url,
      method: TMethods.GET,
    }
 )
};


export const MakeReadNotification = async (
  userId: number,
  notificationId: number
) => {
  
  const url = apiEndPoints.markAsRead;
  const raw = JSON.stringify( {"userId": userId, "notificationId": notificationId});
  return await CommonApiHandler(
    {
      name: "MakeReadNotification",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};


export const NewsLetterNotificationSubs = async (
  userId: number |string,
  email: string
) => {
  
  const url = apiEndPoints.create_email_notification;
  const raw = JSON.stringify( {"userId":userId,"email":email});
  return await CommonApiHandler(
    {
      name: "NewsLetterNotificationSubs",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};


export const paymentMethodlist = async (
  forPackage: number,
  withRenewal: number
) => {
  
  const url = apiEndPoints.paymentMethodList;
  const raw = JSON.stringify({
    forPackage,
    userId: Cookies.get("id"),
    withRenewal,
  });
  return await CommonApiHandler(
    {
      name: "paymentMethodlist",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};

export const loginWithPassword = async (
  password: string
) => {
  let msisdn=Cookies.get('msisdn')??'';
  const url = apiEndPoints.loginWithPassword;
  const raw = JSON.stringify({
    msisdn:normalizeMsisdn(msisdn),
    password,
  });
  return await CommonApiHandler(
    {
      name: "loginWithPassword",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};

export const bkashUnSubscribeUserApi = async (subscription_id: any) => {
  const url = `${apiEndPoints.bkashUnSubscribeApi}?userId=${Cookies.get(
    "id"
  )}&subscriptionid=${subscription_id}`;

  return await CommonApiHandler(
    {
      name: "bkashUnSubscribeUserApi",
      url,
      method: TMethods.DELETE,
      body:null,
      defaultTokenAllowed:false
    }
 )
};

export const robiUnSubscribeUserApi = async (msisdn: any) => {
  const url = `${apiEndPoints.robiUnsubscribeApi}`;
  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    msisdn: `+88${msisdn}`,
  });
  return await CommonApiHandler(
    {
      name: "robiUnSubscribeUserApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
      defaultTokenAllowed:false
    }
 )
};

export const postFavoritesApi = async (id: any) => {
 const url = apiEndPoints.favPostApi;
  const raw = JSON.stringify({
    user_id: Cookies.get("id"),
    audiobook_id: id,
  });
  return await CommonApiHandler(
    {
      name: "postFavoritesApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const setPasswordApi = async (password: string) => {
 const url = apiEndPoints.setPassword;
  const raw = JSON.stringify({
    user_id: Cookies.get("id") ?? Cookies.get("user_id"),
    password,
  });
  return await CommonApiHandler(
    {
      name: "setPasswordApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const getPreferenceData = async (userId: string |number) => {
 const url = apiEndPoints.get_preference;
  const raw = JSON.stringify({
    user_id: userId
  });
  return await CommonApiHandler(
    {
      name: "getPreferenceData",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const gpUnsubscribeApi = async () => {
  const url = `${apiEndPoints.gpUnsubscribeApi}?userId=${Cookies.get("id")}`;
  return await CommonApiHandler(
    {
      name: "gpUnsubscribeApi",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};

export const deleteFavoritesApi = async (id: any) => {
    const url = `${
        apiEndPoints.favDeleteApi
    }?audiobook_id=${id}&user_id=${Cookies.get("id")}`;
    return await CommonApiHandler(
        {
        name: "deleteFavoritesApi",
        url,
        method: TMethods.DELETE,
        defaultTokenAllowed:false 
        }
    )
}

export const postVerifyOtp = async (otp: any) => {
  const url = apiEndPoints.verifyOtp;
  const raw = JSON.stringify({
    msisdn: `${Cookies.get("msisdn")}`,
    password: otp,
  });
  return await CommonApiHandler(
    {
      name: "postVerifyOtp",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false,
      catchCB: (err:any) => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
      }
    }
 )
};



export const postSendOtp = async (msisdn: any,set_password?:boolean) => {
    const url = apiEndPoints.sendOtp;
    const currentTimeLong = Date.now();
    const raw = JSON.stringify({
        msisdn: `${msisdn}`,
        currentTimeLong: currentTimeLong,
        set_password
    });
    let data:any=await CommonApiHandler(
        {
            name: "postSendOtp",
            url,
            method: TMethods.POST,
            body: raw ? raw : null,
            defaultTokenAllowed:false,
            catchCB: (err:any) => {
                showToast('Something went wrong',TtoastType?.error,3000)
            }
        }
    )
    if (
    data?.remainingTime && data?.created!=true
    ) {
    showToast(`Please try after ${formatTime(data.remainingTime)}`,TtoastType.success,3000)
    return data;
    }else{
      console.log(data,"data")
      if(data.message!=="password settled"){
        showToast("OTP Sent!",TtoastType?.success,3000)
      }
    }
    return data;
};

export const postSendOtpOlder = async (msisdn: any) => {
    const url = apiEndPoints.sendOtpOlder;
    const currentTimeLong = Date.now();
    const raw = JSON.stringify({
        msisdn: `88${msisdn}`,
        currentTimeLong: currentTimeLong,
    });
    let data:any= CommonApiHandler(
        {
            name: "postSendOtp",
            url,
            method: TMethods.POST,
            body: raw ? raw : null,
            defaultTokenAllowed:false,
            catchCB: (err:any) => {
                showToast('Something went wrong',TtoastType?.error,3000)
            }
        }
    )
    if (
    data?.remainingTime && data?.created!=true
    ) {
    showToast(`Please try after ${formatTime(data.remainingTime)}`,TtoastType.success,3000)
    return data;
    }else{
      if(data.message!=="password settled")
        showToast("OTP Sent!1",TtoastType?.success,3000)
    }
    return data;
};

export const postLoginApi = async () => {
  const url = apiEndPoints.loginApi;
  const raw = JSON.stringify({
    user_name: `88${Cookies.get("msisdn")}`,
    full_name: "user",
    auth_src: "phone",
    image_url: null,
    channel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postLoginApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postReview = async (id: any, rating_num: any, review: any) => {
  const url = `${apiEndPoints.addReview}${id}/analytics/ratings`;
  const raw = JSON.stringify({
    rating: rating_num,
    review: review,
    user_id: Cookies.get("id"),
  });
   return await CommonApiHandler(
    {
      name: "postReview",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postSearch = async (search_text: any) => {
  const url = apiEndPoints.searchApi;
  const raw = JSON.stringify({
    text: search_text,
  });
  return CommonApiHandler(
    {
      name: "postSearch",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postBookRequest = async (
  user_name: any,
  bookname: any,
  writer: any,
  language: any,
  category: any
) => {
  const url = apiEndPoints.bookRequestPostApi;
  const raw = JSON.stringify({
    name: user_name,
    bookname: bookname,
    writer: writer,
    language: language,
    category: category,
  });
  return await CommonApiHandler(
    {
      name: "postBookRequest",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const updateProfile = async (payloadData: any) => {
  const url = `${apiEndPoints.updateProfile}${Cookies.get("id")}`;
  var raw = JSON.stringify({
    full_name: payloadData.full_name,
    phone_email: `${Cookies.get("msisdn")}`,
    city_name: payloadData.city_name,
    address: payloadData.address,
    post_code: payloadData.post_code,
  });

  return await CommonApiHandler(
    {
      name: "updateProfile",
      url,
      method: TMethods.PUT,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const robiPostApi = async (payloadData: any) => {
  const url = apiEndPoints.robiPaymentApi;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    from_autorenewal: payloadData.isOnetime ? 0 : 1,
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "robiPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const blDcbPostApi = async (payloadData: any) => {
  const url = apiEndPoints.blDcbPaymentApiUrl;
  var raw = JSON.stringify({
    msisdn: payloadData.msisdn,
    userId: payloadData.userId,
    packageId: payloadData.packageId,
    fromRenewal: payloadData.fromRenewal ? 1 : 0,
  });
  return await CommonApiHandler(
    {
      name: "blDcbPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const blDcbVerifyApi = async (payloadData: any) => {
 const url = apiEndPoints.blDcbVerifyApiUrl;
  var raw = JSON.stringify({
    msisdn: payloadData.msisdn,
    consent: payloadData.consent,
  });
  return await CommonApiHandler(
    {
      name: "blDcbVerifyApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const blDcbUnsubscribeApi = async (payloadData: any) => {
  const url = apiEndPoints.blDcbUnsubscribeApiUrl;
  var raw = JSON.stringify({
    userId: payloadData.userId,
  });
  return await CommonApiHandler(
    {
      name: "blDcbUnsubscribeApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const gpPostApi = async (
  payloadData: DynamicSubscriptionPack & {
    reduce_price?: number;
    promo_code?: string;
    msisdn: string;
  }
) => {
  const url = apiEndPoints.gpPaymentApi;

  const raw = JSON.stringify({
    amount: payloadData.rawPrice - (payloadData?.reduce_price ?? 0),
    currency: "BDT",
    userId: Cookies.get("id"),
    packageId: payloadData.subscriptionItemId,
    renewal: payloadData.isOnetime ? 0 : 1,
    promoCode: payloadData.promo_code,
    msisdn: "88" + payloadData.msisdn,
    firstPayment: 1,
    purpose: "subscription",
    trafficSource: "Kabbik",
    platform: "Web",
  });
  return await CommonApiHandler(
    {
      name: "gpPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

// export const stripePostApi = async () => {};

export const bkashOfferYearly = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;

  var raw = JSON.stringify({
    amount: payloadData.amount.toString(),
    packageId: payloadData.packageId,
    methodName: payloadData.methodName,
    source: payloadData.source,
    userId: Cookies.get("id"),
  });

  return await CommonApiHandler(
    {
      name: "bkashOfferYearly",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const bkashOneTimePostApi = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    packageId: payloadData.subscriptionItemId,
    methodName: "bkash",
    source: "web",
    userId: Cookies.get("id"),
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "bkashOneTimePostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const bkashPostApi = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashPaymentApi}`;
  let eDate = new Date().setDate(new Date().getDate() + 730);
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    AMOUNT: payloadData.rawPrice?.toString(),
    FIRSTPAYMENTAMOUNT: firstPrice.toString(),
    CURRENCY: "BDT",
    FREQUENCY: payloadData.frequency,
    STARTDATE: new Date().toISOString().slice(0, 10),
    EXPIRYDATE: new Date(eDate).toISOString().slice(0, 10),
    USERID: Cookies.get("id"),
    PACKAGEID: payloadData.subscriptionItemId,
    subscripRequestFrom: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "bkashPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const paymentForPurchaseAudiobook = async (
  url: string,
  payloadData: any
) => {
  const raw = JSON.stringify(payloadData);
  
  return await CommonApiHandler(
    {
      name: "paymentForPurchaseAudiobook",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const nagadPurchaseAudiobook = async (payload: any) => {
  const raw = JSON.stringify(payload);

  return await CommonApiHandler(
    {
      name: "nagadPurchaseAudiobook",
      url:payload.url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const nagadPostApi = async (payloadData: any) => {
 const url = `${apiEndPoints.nagadPaymentApi}`;
  let firstPrice =
    payloadData?.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData?.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "nagadPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const upayPostApi = async (payloadData: any) => {
 const url = `${apiEndPoints.upayPaymentApi}`;
  let firstPrice =
    payloadData?.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData?.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "upayPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const aamarpayPostApi = async (payloadData: any, userData: any) => {
  const url = `${apiEndPoints.aamarpayPaymentAPi}`;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    promo_code: payloadData.promo_code ? payloadData.promo_code : "",
    type: "subscription",
    source: "Kabbik",
    platform: "web",
    userId: userData.id,
    productId: payloadData.subscriptionItemId,
    name: userData.full_name,
    phone: userData.phone_no,
    address: userData.address,
  });
  return await CommonApiHandler(
    {
      name: "aamarpayPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const paymentVerify = async (order_id: any) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
  const url = `${apiEndPoints.verifyPayment}`;
  var raw = JSON.stringify({
    sp_order_id: order_id,
  });
  return await CommonApiHandler(
    {
      name: "paymentVerify",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const postEpisodePlayCountApi = async (id: any) => {
  const url = `${apiEndPoints.episodePlayCount}${id}/analytics/play-counts-episode?id=${id}`;

  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    fromChannel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postEpisodePlayCountApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const postAudiobookPlayCountApi = async (id: any) => {
 const url = `${apiEndPoints.audioBookPlayCount}${id}/analytics/play-counts?id=${id}`;

  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    fromChannel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postAudiobookPlayCountApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const getPromoCodeApi = async (pack_id: any, promo_id: any) => {
 const url = `${
    apiEndPoints.promoCodeGet
  }for_package=${pack_id}&user_id=${Cookies.get("id")}&promocode=${promo_id}`;

  return await CommonApiHandler(
    {
      name: "getPromoCodeApi",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};

export const redeemCodePostApi = async (redeemCode: any) => {
 const userId = Cookies.get("id");
const url = apiEndPoints.redeemCodeApi;
  var raw = JSON.stringify({
    code: redeemCode,
    userId: userId,
  });
  return await CommonApiHandler(
    {
      name: "redeemCodePostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const postGoogleLogin = async (token_id: any) => {
  const url = apiEndPoints.postGooglAuth;
  var raw = JSON.stringify({
    token: token_id,
    channel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postGoogleLogin",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false,
      noToken:true 
    }
  )
};

export const accountDeletion = async (
  userName: any,
  phoneNo: any,
  userEmail: any,
  reason: any
) => {
  const url = apiEndPoints.accountDelete;

  const raw = JSON.stringify({
    name: userName,
    phone: phoneNo,
    email: userEmail,
    reason: reason,
  });
  return await CommonApiHandler(
    {
      name: "accountDeletion",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const getPurchasedAudiobooks = async (userId: number) => {
  const url = `${apiEndPoints.getPurchasedAudiobooks}${userId}`;
 
  return await CommonApiHandler(
    {
      name: "getPurchasedAudiobooks",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const getAllCourse = async () => {
  const userId = Cookies.get("id");
  const url = apiEndPoints.getAllCourse + userId;
  
  return await CommonApiHandler(
    {
      name: "getAllCourse",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};

export const bkashPurchaseCourse = async (payloadData: any) => {
    const url = `${apiEndPoints.bkashPurchaseCourse}`;
    const raw = JSON.stringify(payloadData);
  
  return await CommonApiHandler(
    {
      name: "bkashPurchaseCourse",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const getPurchasedCourse = async () => {
    const userId = Cookies.get("id");
  const url = `${apiEndPoints.getPurchasedCourse}${userId}`;
  return await CommonApiHandler(
    {
      name: "getPurchasedCourse",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};

export async function homeListData() {
 const url = apiEndPoints.homeList;
  
  return await CommonApiHandler(
    {
      name: "homeListData",
      url:url,
      method: TMethods.GET,
    }
  )
}

export async function topBanner() {
  const url = apiEndPoints.topbannerImage;
  
  return await CommonApiHandler(
    {
      name: "topBanner",
      url:url,
      method: TMethods.GET,
    }
  )
}

export const premiumList = async () => {
 return await CommonApiHandler(
    {
      name: "premiumList",
      url:apiEndPoints.premuimAudioBookList,
      method: TMethods.GET,
    }
  )
};

export const promoBannerList = async () => {
  const url = apiEndPoints.promoBannerList;
  return await CommonApiHandler(
    {
      name: "promoBannerList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const categorySuggestions = async () => {
  const url = apiEndPoints.catagorySuggestions;
   return await CommonApiHandler(
    {
      name: "categorySuggestions",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const fetchDataFromJson = async () => {
  const url = "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-jsons/kabbik_new_jest.json?v="+Date.now();
   return await CommonApiHandler(
    {
      name: "fetchDataFromDigitalSpaceJson",
      url:url,
      method: TMethods.GET,
      notNeedHeaders:true
    }
  )
};

export const userProfile = async () => {
  const userId = Cookies.get("id") ;
   return await CommonApiHandler(
    {
      name: "userProfile",
      url:`${apiEndPoints.getuserProfileApi}${userId}`,
      method: TMethods.GET,
    }
  )
};

export const userContinue = async () => {
    const defaultUserId = "2820";
    const userId = Cookies.get("id") ? Cookies.get("id") : defaultUserId;
    return await CommonApiHandler(
        {
            name: "userContinue",
            url: `${apiEndPoints.continueListeningGet}${userId}`,
            method: TMethods.GET,
        }
    )
};

export const academicList = async () => {
 const url = apiEndPoints.academicList;
 return await CommonApiHandler(
    {
      name: "academicList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const upcomingList = async () => {
  const url = apiEndPoints.upComingApi;
  
   return await CommonApiHandler(
    {
      name: "upcomingList",
      url:url,
      method: TMethods.GET
    }
  )
};

export const podcastList = async () => {
    const url = apiEndPoints.podcastList;
    
    return await CommonApiHandler(
        {
            name: "podcastList",
            url:url,
            method: TMethods.GET,
        }
    )
};

export const freeAudiobookList = async () => {
  const url = apiEndPoints.freeAudioBookList;
 
  return await CommonApiHandler(
    {
      name: "freeAudiobookList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const userSummary = async () => {
  const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
  const url = `${apiEndPoints.userSummary}${userId}`;

  return await CommonApiHandler(
    {
      name: "userSummary",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const favoriteAudiobook = async () => {
  
    const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
    const url = `${apiEndPoints.favoriteAudioBookList}?user_id=${userId}`;
  return await CommonApiHandler(
    {
      name: "favoriteAudiobook",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const authorDetails = async (name: string) => {
  const url = `${apiEndPoints.authorDetails}${name}`;
  
  return await CommonApiHandler(
    {
      name: "authorDetails",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const authorEpisodes = async (name: string) => {
  const url = `${apiEndPoints.authorEpisodes}${name}`;
 
  return await CommonApiHandler(
    {
      name: "authorEpisodes",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const castDetails = async (name: string) => {
  const url = `${apiEndPoints.castCrewDetails}${name}`;
  return await CommonApiHandler(
    {
      name: "castDetails",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const castEpisodes = async (name: string) => {
 const url = `${apiEndPoints.castCrewEpisodes}${name}`;
  
  return await CommonApiHandler(
    {
      name: "castEpisodes",
      url:url,
      method: TMethods.GET
    }
  )
};

export const homeCatagoryItems = async (name: any) => {
  const url = `${apiEndPoints.homeCategoryItems}${name}`;
  
  return await CommonApiHandler(
    {
      name: "homeCatagoryItems",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const catagoryItemList = async (id: any) => {
  const url = `${apiEndPoints.catagoryItems}${id}`;
  
  return await CommonApiHandler(
    {
      name: "catagoryItemList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const catagoryList = async () => {
  const url = apiEndPoints.catagoryList;
  return await CommonApiHandler(
    {
      name: "catagoryList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const subscriptionList = async () => {
  const url = apiEndPoints.new_packageList ;
  return await CommonApiHandler(
    {
      name: "subscriptionList",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({ "countryAccess":  "BD"  })
    }
  )
};

export const create_preference = async (payload:any):Promise<any> => {
  const url = apiEndPoints.create_preference ;
  return await CommonApiHandler(
    {
      name: "create_preference",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload)
    }
  )
};

export async function addFavorite( audioBookId:string) {
  const userId= Cookies.get("user_id");
  const bodyData = {
    user_id: userId,
    audiobook_id: audioBookId.toString(),
  };
  return await CommonApiHandler(
    {
      name: "addFavorite",
      url:apiEndPoints.favPostApi,
      method: TMethods.POST,
      body:JSON.stringify(bodyData)
    }
  )
}

export const cityBankApiTest = async () => {
  const url = "http://localhost:8097/api/routes/city-bank-payment-status";
  return await CommonApiHandler(
    {
      name: "cityBankApiTest",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({txnStatus:1,merchanRefNo:"fgfdhhfdfb436",
transactionId:"fhdh3747719084f2892710e9",txnamount:10000} )
    }
  )
};

export const getAuthors = async (searchparams?:string) => {
  let url = `${apiEndPoints.get_authors}?limit=100`;
  if(searchparams){
    url=url+`&search=${searchparams}`
    console.log(url,"url")
  }
  return await CommonApiHandler(
    {
      name: "getAuthors",
      url:url,
      method: TMethods.GET,
      noToken:true
    }
  )
};

export const ratingReviewList = async (id: number) => {
  const url = `${apiEndPoints.reviewList}${id}`;
  return await CommonApiHandler(
    {
      name: "ratingReviewList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const getMembershipData = async (card: any) => {
  const url = `https://membership.apars.shop/api/card/check/${card}`;
  
  return await CommonApiHandler(
    {
      name: "getMembershipData",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const continueListeningPostApi = async (payload: any) => {
  const url = `${apiEndPoints.continueListeningPost}${Cookies.get("id")}`;
  const raw = JSON.stringify({
    data: payload,
  });
  return await CommonApiHandler(
    {
      name: "continueListeningPostApi",
      url:url,
      method: TMethods.POST,
      body:raw
    }
  )
};

export const bkashOfferHalfYearly = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;

  var raw = JSON.stringify({
    amount: payloadData.amount.toString(),
    packageId: payloadData.packageId,
    methodName: payloadData.methodName,
    source: payloadData.source,
    userId: Cookies.get("id"),
  });
  return await CommonApiHandler(
    {
      name: "bkashOfferHalfYearly",
      url:url,
      method: TMethods.POST,
      body:raw,
      defaultTokenAllowed:false
    }
  )
};

export const getStoreProducts = async () => {
  const url = `${apiEndPoints.getStoreItem}`;
    return await CommonApiHandler(
    {
      name: "getStoreProducts",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};

export const getDynamicPaymentMethods = async (purpose: string) => {
  const url = `${apiEndPoints.getDynamicPaymentMethods}${purpose}`;

  return await CommonApiHandler(
    {
      name: "getDynamicPaymentMethods",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};

export const makeDynamicPayment = async (payload: any, option: any) => {
  const url = option.url;
  let result:any = await CommonApiHandler(
    {
      name: "makeDynamicPayment",
      url:url,
      method: TMethods.POST,
      body: JSON.stringify(payload),
      defaultTokenAllowed:false
    }
  )
  window.location.replace(
      option.method_name === "Bkash"
        ? result.data.bkashURL
        : option.method_name === "Nagad"
        ? result.data.callBackUrl
        : option.method_name === "AamarPay"
        ? result.data.callBackUrl
        : "/cart"
    );
    return result;
};

export const getCurrentEpisodePath = async (
  audiobookId: number,
  episodeId: number
) => {
    const url = `${apiEndPoints.currentEpisodePath}?audiobookId=${audiobookId}&episodeId=${episodeId}`;
    return await CommonApiHandler(
    {
      name: "getCurrentEpisodePath",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const getSessionInit = async (id: number, episode_id: number) => {
  const url = `${apiEndPoints.sessionInit}id=${id}&episode_id=${episode_id}`;
  
  return await CommonApiHandler(
    {
      name: "getSessionInit",
      url:url,
      method: TMethods.GET,
      extraHeaders:{credentials: "include"},
      defaultTokenAllowed:false
    }
  )
};

export const getSessionLog = async (play: boolean) => {
  const url = `${apiEndPoints.sessionLog}play=${play}`;
  
  return await CommonApiHandler(
    {
      name: "getSessionLog",
      url:url,
      method: TMethods.GET,
      extraHeaders:{credentials: "include"},
      defaultTokenAllowed:false
    }
  )
};

export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("size", file.size);
    const response = await fetch(
      "https://api.kabbik.com/v3/audiobooks/upload-image-in-stack",
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await response.json();
    return res.image_file_url;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const postBlog = async (payload: BlogInfo) => {
    return await CommonApiHandler(
    {
      name: "postBlog",
      url:apiEndPoints.postBlogUrl,
      method: TMethods.POST,
      body: JSON.stringify({ ...payload, userId: Cookies.get("id") }),
      defaultTokenAllowed:false
    }
  )
};


export const testGet = async () => {
  const url = `https://api.kabbik.com/v4/test/sample`;
  
  return await CommonApiHandler(
    {
      name: "testGet",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const testPost = async () => {
  const url = `https://api.kabbik.com/v4/test/sample`;
  return await CommonApiHandler(
    {
      name: "testPost",
      url:url,
      method: TMethods.POST,
      defaultTokenAllowed:false
    }
  )
};

export const getCategoryData = async () => {
  return await CommonApiHandler(
    {
      name: "getCategoryData",
      url:apiEndPoints.catagoryList,
      method: TMethods.GET,
      extraHeaders:{cache: "no-store"}
    }
  )
}

export const getUserProfile =async () => {  
  const userId = Cookies.get("id") ? Cookies.get("id") : "2820";

  return await CommonApiHandler(
    {
      name: "getUserProfile",
      url:`${apiEndPoints.getuserProfileApi}${userId}`,
      method: TMethods.GET,
      extraHeaders:{cache: "no-store"}
    }
  )
};