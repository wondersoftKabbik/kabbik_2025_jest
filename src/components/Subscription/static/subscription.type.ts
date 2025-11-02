interface DynamicSubscriptionPack {
  accessible_content: string;
  amount: string;
  bkashOnetime: number;
  bkashSubscription: number;
  canApplyPromo: number;
  country: string;
  created_at: Date | string;
  days: number;
  description: string;
  dynamicPrice: string;
  excluded_payment_methods: string | null;
  frequency: string;
  globalPrice: string;
  googlePay: number;
  id: number;
  isOnetime: number;
  length: string;
  nagadOnetime: number;
  name: string;
  priority: string;
  rawPrice: number;
  recommendation: string;
  redeem: number;
  banner_name: string | null;
  sku: string;
  subtitle?:string;
  bn_name?:string;
  free_trial_in_day?:number;
  benefit:TBenefits;
  status: string;
  subscriptionItemId: string;
  surjoPay: number;
  updated_at: null;
  vat: number;
  is_free_trail?:boolean;
}
type TBenefits={title:string,sub_title:string}[]

export default DynamicSubscriptionPack;
