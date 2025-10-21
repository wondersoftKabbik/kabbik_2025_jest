import { siteConfig } from "@/config/config";
import type { Metadata } from "next";
import Script from "next/script";
import React from "react";

export const metadata: Metadata = {
  title: "Kabbik audiobook",
  description: "Kabbik  audiobook",
  icons:{
    icon:siteConfig.logo
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body suppressHydrationWarning={true}>
            {children}
            <Script id="tawk-script" strategy="afterInteractive">
            {`
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script"),
                    s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/68cb9938b695741925a90747/1j5dkt1it';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `}
          </Script>
      </body>
    </html>
  );
}
