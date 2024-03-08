import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const SocialMediaCard = () => {
  const t = useTranslations("socialMedia");
  const tt = useTranslations("channels");
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-semibold">{t("title")}</h2>
      <p className="mt-2 text-sm text-center">{t("content")}</p>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <a
          target="_blank"
          href={"https://t.me/CryptoRaider5"}
          className="col-span-6 flex flex-col justify-center items-center"
        >
          <img src="/channel2.jpg" className="w-[50px] rounded-[50%] sp" />
          <span className="text-sm text-center">{tt("channel1")}</span>
        </a>
        <a
          target="_blank"
          href={"https://t.me/Crypto7RaidersCH"}
          className="col-span-6 flex flex-col justify-center items-center"
        >
          <img src="/channel2.jpg" className="w-[50px] rounded-[50%]" />
          <span className="text-sm text-center">{tt("channel2")}</span>
        </a>
        <a
          target="_blank"
          href={"https://t.me/CryptoRaidersChart"}
          className="col-span-6 flex flex-col justify-center items-center"
        >
          <img src="/channel1.jpg" className="w-[50px] rounded-[50%]" />
          <span className="text-sm text-center">{tt("channel3")}</span>
        </a>
        <a
          target="_blank"
          href={"https://twitter.com/Crypto7Raiders"}
          className="col-span-6 flex flex-col justify-center items-center"
        >
          <img src="/twitter.png" className="w-[50px] rounded-[50%]" />
          <span className="text-sm text-center">{tt("channel5")}</span>
        </a>
      </div>
      <Link className="mt-4 text-xs hover:underline hover:decoration-primary" href={'/who_us'}>{t("showmore")}</Link>
    </div>
  );
};

export default SocialMediaCard;
