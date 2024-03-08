"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { BsTwitterX, BsTelegram, BsYoutube} from "react-icons/bs";



const Footer = () => {
  let t = useTranslations("Footer");
  let tt = useTranslations("Header");
  const items = [
    {
      id: "1",
      label: "منصة Bing X",
      link: "https://bingx.com/en-us/",
    },
    {
      id: "2",
      label: "منصة Coinex",
      link: "https://www.coinex.com/ar/",
    },
    {
      id: "3",
      label: "منصة KuCoin",
      link: "https://bingx.com/en-us/",
    },
  ];
  return (
    <div className="footer px-[5%] py-8 text-white">
      <div className="mt-[0px] w-[100%] md:grid md:grid-cols-12 flex flex-col gap-10">
        <div className="col-span-4">
          <img src="/B.png" className="w-[80px]" />
          <h2 className="text-2xl">{t("aboutus")} :</h2>
          <p className="mt-2 lg:text-md text-sm">{t("synopsis")}</p>
        </div>
        <div className="col-span-8 flex md:!mt-[120px] mt-4 justify-between items-start gap-8">
          <div className="flex flex-col items-start justify-center gap-4">
            <Link className="lg:text-md text-sm" href="/">
              {tt("home")}
            </Link>
            <Link className="lg:text-md text-sm" href="/crypto_news">
              {tt("crypto_news")}
            </Link>
            <Link className="lg:text-md text-sm" href="/all_articles">
              {tt("posts")}
            </Link>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
           <Link className="lg:text-md text-sm" href="/explanations">
              {tt("explanations")}
            </Link>
            <Link className="lg:text-md text-sm" href="/contact_us">
              {tt("contactus")}
            </Link>
            <Link className="lg:text-md text-sm" href="/who_us">
              {tt("whous")}
            </Link>
          </div>
          <div className="flex justify-end">
            <img src="/C.png" className="w-[100px]" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 mt-6">
         <a href="https://t.me/CryptoRaider5" target="_blank">
           <BsTelegram className="text-xl"/>
         </a>
         <a href="https://t.me/Crypto7RaidersCH" target="_blank">
           <BsTelegram className="text-xl"/>
         </a>
         <a href="https://twitter.com/Crypto7Raiders" target="_blank">
           <BsTwitterX className="text-xl"/>
         </a>
         <a href="https://youtube.com/@YazanMarouf?si=G6EEFHC4ZJQIoeZm" target="_blank">
           <BsYoutube className="text-xl"/>
         </a>
      </div>
    </div>
  );
};

export default Footer;
