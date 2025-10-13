import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kabbik audiobook",
  description: "Kabbik  audiobook",
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
