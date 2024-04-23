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
  metadataBase: new URL("https://cryptoraiders.org"),
  title: {
    default: "Cryptoraiders",
    template: `%s | Cryptoraiders`,
  },
  description: "The Crypto Raiders team is the largest team in the Middle East that provides advisory services to individuals and companies looking to benefit from financial technology and digital currencies in their businesses. Our team is considered a reliable source of information and education for beginners in the field of digital currencies. We work hard to enhance awareness and promote commercial exchange in the crypto market permanently and continuously",
  openGraph:{
    images:[{
      url:'/channel2.jpg',
      width: 400,
      height: 200,
    }]
  },
  twitter:{
    title: "Cryptoraiders",
    description: "The Crypto Raiders team is the largest team in the Middle East that provides advisory services to individuals and companies looking to benefit from financial technology and digital currencies in their businesses. Our team is considered a reliable source of information and education for beginners in the field of digital currencies. We work hard to enhance awareness and promote commercial exchange in the crypto market permanently and continuously",
    images:[{
      url:'/channel2.jpg',
      width: 400,
      height: 200,
    }]
  }
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
              <div className="py-[100px] bg-content1">
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
