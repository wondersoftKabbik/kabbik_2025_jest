export interface ReferralData {
  animated_image: string;
  benefit: string[];
  sharable_content: string;
  unsubscribed_user_content: string[];
  withdrawal_amounts: WithdrawalAmount[];
  sharable_image_url: string;
  copy_widget_title: string;
  copyContent: string;
}

export interface WithdrawalAmount {
  title_amount: string;
  amount: string; // keep as string since your JSON values are quoted
}

export type TClaimHistory = {
  data: {
    status: "PENDING" | "DELIVERED" | "CLAIMED" | string; // extend if more statuses possible
    feedback: string | null;
    award_type: string;
    amount: number;
    created_at: string; // ISO date string
  }[];
  summary: {
    totalClaim: number;
    totalDelivered: number;
    totalPending: number;
  };
};