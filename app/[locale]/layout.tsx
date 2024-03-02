import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Header from "../components/Common/Header";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Common/Footer";


export const metadata: Metadata = {
  title: "Cyptoraiders",
  description: "Cyptoraiders",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = useMessages();
  const locale = useLocale();
  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body dir={locale === "ar" ? "rtl" : "ltr"}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
              <Header />
              <div className="mt-[100px]">
              <LatestNews/>
              <main className="px-[5%] py-4">{children}</main>
              </div>
              <Footer/>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
