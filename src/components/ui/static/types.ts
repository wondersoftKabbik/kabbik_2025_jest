import { ReelType } from "@/components/Home/static/utils";

export type TCommonBtnProps={
    isLoading?:boolean;
    disabled?:boolean;
    children:string | React.ReactNode;
    handleClick?:(val:any) => void;
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
        videos: {
          link: string;
          thumbnail: string;
        }[]
    },
    big_book_banners:[
        {
            img:string,
            id:string
        }
    ],
    upcoming:{
      thumb_path: string;
      date: string;
    }[];
    popular_categories:{
      img:string;
      path:string;
    }[],
    campaign_video:{
      videos: {
        link: string;
        thumbnail: string;
      }[]
    },
    nepal_tour_video:{
      videos: {
        video_url: string;
        heading: string;
        para: string;
        thumbnail: string;
      }[]
    },
    teamMembers:{
        name: string;
        title: string;
        description: string;
        imageUrl: string;
    }[],
    reels:ReelType[]
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
  subscriptionDetails:SubscriptionPack;
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

type SubscriptionPack = {
  accessible_content: string;
  amount: string;
  banner_name: string;
  base_amount_bn: string;
  benefit: string; // JSON string — can parse into BenefitItem[]
  bn_name: string;
  country: string;
  country_access: string;
  created_at: string;
  days: number;
  description: string;
  display_pack_name: string;
  dynamicPrice: string;
  excluded_payment_methods: string | null;
  forDomain: string | null;
  for_affiliate: number;
  free_trial_in_day: number;
  frequency: string;
  globalPrice: string;
  id: number;
  isOnetime: number;
  is_free_trail: number;
  is_promo_applicable: number;
  length: string;
  name: string;
  priority: string;
  rawPrice: number;
  recommendation: string;
  recurring_banner_name: string | null;
  sku: string;
  status: string;
  subscriptionItemId: string;
  subtitle: string;
  updated_at: string | null;
  vat: number;
};



// export type TCommonBtnProps={
//   isLoading:boolean;
//   disabled:boolean;
//   children:boolean;
//   handleClick:boolean;
//   className:boolean;
// }

export  type RatingProps = {
  /** Current rating value (controlled). Supports fractions. */
  value?: number;
  /** Initial value (uncontrolled). */
  defaultValue?: number;
  /** Called when user selects a value. */
  onChange?: (value: number) => void;
  /** Minimum value (inclusive). Default: 1 */
  min?: number;
  /** Maximum value (inclusive). Default: 5 */
  max?: number;
  /** Step for interaction (mouse/keyboard). Default: 0.5 */
  step?: number;
  /** If true, disables interactions. */
  readOnly?: boolean;
  /**
   * Render prop for the full icon. Should be a component that respects currentColor
   * and accepts className.
   * Example: ({ className }) => <Star className={className} />
   */
  icon:  React.ReactNode;
  /** Size utility classes, e.g., "w-6 h-6". Default: "w-6 h-6" */
  sizeClasses?: string;
  /** Extra classes for the root container. */
  className?: string;
  /** Color classes for filled and empty states. */
  fillClassName?: string; // e.g., "text-yellow-500"
  emptyClassName?: string; // e.g., "text-gray-300 dark:text-gray-600"
  /** Accessible label prefix */
  ariaLabel?: string;
};

export type TuserPreferenceSlice={
  userPreferenceData:null | TUserPreferenceResponse
}

export type TUserPreferenceResponse={
  id: number|string;
  authors: (string|number)[] | null;
  categories: (string|number)[] | null;
}