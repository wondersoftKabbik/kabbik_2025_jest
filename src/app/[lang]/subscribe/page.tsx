// 36ac474653b4a1e3840e62eeebd4411d2dbf61b9 last commit by sakib vai
// import { DynamicSubscriptionPack } from "@/helpers/commonTypes";
import { catagoryList, subscriptionList } from "@/utils/apiServices";
import { Metadata } from "next";
import SubscribeComponent from "@/components/Subscription/Subscription.view"
import DynamicSubscriptionPack from "@/components/Subscription/static/subscription.type";


export const metadata: Metadata = {
  title:
    "Kabbik App Subscription | Daily | Monthly | Half Yearly | Yearly Pack",
  description:
    "Listen more than 3000 + Bangla Audio book through subscribing your desire one.",
};

const Subscribe = async () => {
  const subscriptionPackList: DynamicSubscriptionPack[] = (
    await subscriptionList()
  ).data
    .sort(
      (a: DynamicSubscriptionPack, b: DynamicSubscriptionPack) =>
        Number(a.priority) - Number(b.priority)
    )
    // .filter((x: DynamicSubscriptionPack) => x.id !== 6);
  const categoryListData = await catagoryList();
      // console.log(subscriptionPackList)
  return (
    <div className="max-w-full overflow-x-hidden">
      <SubscribeComponent
        subscriptionPackList={subscriptionPackList}
        categoryListData={categoryListData}
      />
    </div>
  );
};

export default Subscribe;
