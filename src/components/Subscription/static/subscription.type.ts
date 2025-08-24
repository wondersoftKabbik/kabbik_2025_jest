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
  status: string;
  subscriptionItemId: string;
  surjoPay: number;
  updated_at: null;
  vat: number;
}

export default DynamicSubscriptionPack;
