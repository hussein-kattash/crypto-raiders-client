"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getPostById } from "../services/getPostById";
import { useLocale, useTranslations } from "next-intl";
import SkeletonCardDetails from "./SkeletonCardDetails";
import SocialMediaCard from "./SocialMediaCard";
import { Chip } from "@nextui-org/react";
import RecentlyPublished from "./RecentlyPublished";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import AllAds from "./AllAds";

const CardDetails = () => {
  const locale = useLocale();
  const params = useParams();
  const t = useTranslations("postdetails")

  const { data, isError, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPostById(params.id as any),
  });

  const getContentByLocale = () => {
    switch (locale) {
      case "ar":
        return data?.content.ar;
      case "en":
        return data?.content.en;
      case "ru":
        return data?.content.ru;
      default:
        return data?.content.ar;
    }
  };

  const getTitleByLocale = () => {
    switch (locale) {
      case "ar":
        return data?.title.ar;
      case "en":
        return data?.title.en;
      case "ru":
        return data?.title.ru;
      default:
        return data?.title.ar;
    }
  };

  const getCategoryByLocale = () => {
    switch (locale) {
      case "ar":
        return data?.category.ar;
      case "en":
        return data?.category.en;
      case "ru":
        return data?.category.ru;
      default:
        return data?.category.ar;
    }
  };

  const shareUrl = `https://cryptoraiders.org/${locale}/post/${params.id}`;
 
  return (
    <div className="mt-12 grid grid-cols-12 gap-4">
      <div
        className={`lg:!col-span-8 col-span-12 ${locale === "ar" ? "lg:!border-l" : "lg:!border-r"}`}
      >
        {isLoading && <SkeletonCardDetails />}
        {!isLoading && data && (
          <div className="flex flex-col items-start gap-8 p-4">
            <h2 className="md:!text-3xl text-xl font-semibold">{getTitleByLocale()}</h2>
            <div className="flex justify-center gap-2">
              {getCategoryByLocale()?.map((category,idx) => (
                <Chip key={idx} color="primary">{category}</Chip>
              ))}
            </div>
            {data.image && (
              <img src={data?.image} className="w-full sm:!h-[400px] h-[220px]" />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: getContentByLocale() as any }}
            />
            <div className="mt-10 font-bold">{t("share")} :</div>
            <div className="flex  md:w-[50%] w-[90%] rounded flex-row gap-8 py-2 mt-0 justify-center mx-auto items-center">
              <FacebookShareButton url={shareUrl}>
                 <img src="/facebook.png" className="w-[40px]"/>
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl}>
              <img src="/whatsapp.png" className="w-[40px]"/>
              </WhatsappShareButton>
              <TelegramShareButton url={shareUrl}>
              <img src="/telegram.png" className="w-[40px]"/>
              </TelegramShareButton>
              <TwitterShareButton url={shareUrl}>
              <img src="/twitter.png" className="w-[40px]"/>
              </TwitterShareButton>
            </div>
            <div className="w-[100%]">
              <AllAds/>
            </div>
          </div>
        )}
      </div>
      <div className="lg:!col-span-4 col-span-12">
        <div className="p-4 flex flex-col h-[300px]">
          <SocialMediaCard />
        </div>
        <div className="mt-4 border-t-4 border-primary flex flex-col">
          <RecentlyPublished />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
