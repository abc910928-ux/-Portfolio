import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "莊子洋 ｜ 建築模型與 3D 建模作品集",
  description:
    "莊子洋 Tzu-Yang Chuang 的建築模型與 3D 建模作品集：實體建築模型、參數化建模與 3D 展示。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
