export type TCommonBtnProps={
    isLoading?:boolean;
    disabled?:boolean;
    children:string | React.ReactNode;
    handleClick?:() => void;
    className?:string;
}

export type staticTextSlice= {
  data: null |
  {
    home_page_steps_by_steps: {
      heading: string;
      datas: string[];
    };
    best_collection: {
      bg: string;
      heading: string;
      para: string;
      category: string;
    }[];
    home_video:{
        "video1":string;
    },
    big_book_banners:[
        {
            img:string,
            id:string
        }
    ]
  }
};


export type TCategoryItem= {
  id: number;
  name: string;
  price: number;
  thumb_path: string;
  rent_duration_day: number;
  priority: number;
  isPurchased: number;
  for_rent: number;
  forAcademic: number;
  deleted: number;
  created_at: string;   // or Date, if you parse it
  updated_at: string;   // or Date, if you parse it
};

export type TCategoriesSlice={
  CategoriesData:TCategoryItem[]|null;
}

export type TUserSlice={
  userData:TUserProfile|null;
}

export type TUserProfile = {
  id: number;
  full_name: string;
  user_name: string;
  phone_no: string;
  address: string;
  city: string;
  post_code: string;
  user_email: string | null;
  image_url: string | null;
  role: number;
  status: string;
  message: string;
  premium: number;
  payment_method: string;
  auth_src: string;
  subscription_id: string;
  package_id: number;
  is_subscribed: number;
  canceled_subscription: number;
  purchase_time: number;
  next_purchase_time: number;
  total_earnings: number;
  total_payout: number;
  total_withdraw: number;
  refer_code: string | null;
  user_id_fb: string | null;
  client_id: string | null;
  client_secret: string | null;
  pass_hash: string | null;
  channel: string | null;
  deleted: number;
  created_at: string; // or Date if parsed
  updated_at: string; // or Date if parsed
};


// export type TCommonBtnProps={
//   isLoading:boolean;
//   disabled:boolean;
//   children:boolean;
//   handleClick:boolean;
//   className:boolean;
// }