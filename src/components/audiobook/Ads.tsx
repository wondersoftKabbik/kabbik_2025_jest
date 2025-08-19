import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const Ads = ({ slotId }: { slotId: number }) => {
  useEffect(() => {
    try {
      //   if (window.adsbygoogle && !window.adsbygoogle.loaded)
      (window.adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
    return () => {
      window.adsbygoogle = [];
    };
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3514908048340490"
      data-ad-slot={`${slotId}`}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};
