"use client";

export default function RefundAndReturnPolicy() {
  return (
    <div className="max-w-5xl relative mx-auto px-6 py-16 text-gray-100">
        <div className="circular_gradient right-[20%]  top-[10%] w-[20vw] h-[20vw] absolute  "></div>
        <div className="circular_gradient left-[20%]  bottom-[0%] w-[20vw] h-[20vw] absolute  "></div>
        
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-100">
        Refund and Return Policy
      </h1>

      <div className="space-y-6 leading-relaxed">
        <p>
          Our return policy allows active kabbik members to take a chance on a new narrator or story without losing a credit, or return titles purchased in error. Returns must be made within 365 days of purchase. Our ability to offer this policy is dependent on our members using it only for these purposes. We reserve the right to monitor returns for any abuse, such as excessive returns, frequent return of titles after prolonged listening, or returns of multiple titles at a time. In instances where we find return privileges are being misused, Kabbik reserves the right in its sole discretion to limit the number of returns allowed by each member, including, but not limited to, the loss of return privileges. Customers who cancel or fail to maintain their membership in good standing are not eligible to make returns. Kabbik may cancel or modify the terms of our returns policy with respect to any or all participants at any time.
        </p>

        <h2 className="text-2xl font-semibold text-white-100 pt-8">
          Subscription
        </h2>
        <p>
          Company may introduce various subscription models for the benefit of Users on the Website/Application from time to time. Users may choose subscription models by paying subscription amounts at the desired frequencies and avail the various benefits linked to such subscription models. A User can pay the Subscription Amounts through payment channels enabled on the Website/Application at the frequency as chosen by the author from the options made available by the Company for each subscription model.
        </p>
      </div>

      <div className="mt-16 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Kabbik. All rights reserved.</p>
      </div>
    </div>
  );
}
