import { siteConfig } from "@/config/config";
import type { Metadata } from "next";
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
      </body>
    </html>
  );
}
