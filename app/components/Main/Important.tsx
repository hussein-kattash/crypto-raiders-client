"use client"
import { Card, Chip, Skeleton } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { PiClockBold } from "react-icons/pi";
import LatestAds from "../LatestAds";
import { useQuery } from "@tanstack/react-query";
import { getImportantPost } from "@/app/services/getImportantPost";
import { useRouter } from "next/navigation";

const Important = () => {
  const t = useTranslations("Important");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["important"],
    queryFn: getImportantPost,
  });
  
  return (
    <div>
      <h2 className="text-2xl mt-1">{t("title")}</h2>
      <div>
        {
          isLoading && (
            <div>
              <SkeletonImportantCard/>
            </div>
          )
        }
        {
          (!isLoading && data) && (
            data.posts.map((post)=>(
              <div key={post._id}>
                <ImportantCard
                _id={post._id}
                image={post.image}
                artitle={post.title.ar}
                entitle={post.title.en}
                rutitle={post.title.ru}
                arContent={post.content.ar}
                enContent={post.content.en}
                ruContent={post.content.ru}
                arCategory={post.category.ar}
                enCategory={post.category.en}
                ruCategory={post.category.ru}
                date={post.createdAt}
                />
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Important;

type Props = {
  _id: string;
  image: string;
  artitle: string;
  entitle: string;
  rutitle: string;
  arContent:string,
  enContent:string,
  ruContent:string,
  arCategory: String[];
  ruCategory: String[];
  enCategory: String[];
  date: Date | String;
};

const ImportantCard = ({
  image,
  entitle,
  rutitle,
  artitle,
  date,
  _id,
  arCategory,
  ruCategory,
  enCategory,
  arContent,
  enContent,
  ruContent,
}: Props) => {
  const locale = useLocale();
  const formatDate = new Date(date as Date).toLocaleDateString();
  const getContentByLocale = () => {
    switch (locale) {
      case "ar":
        return arContent;
      case "en":
        return enContent;
      case "ru":
        return ruContent;
      default:
        return arContent;
    }
  };

  const route = useRouter()
  
  return (
    <div onClick={() => route.push(`/post/${_id}`)} className="mt-4">
      <div className="cursor-pointer bg-content1 rounded border pb-4 flex flex-col gap-4 border-gray-500">
        <img
          src={image ? image : '/no-image-placeholder-6f3882e0.webp'}
          className="rounded-t xl:!h-[360px] lg:!h-[300px] sm:!h-[350px] h-[250px] w-full"
        />
        {
            locale === 'ar' && (
              <div className="flex flex-row gap-1 justify-start sm:!mx-8 mx-4">
                {
                  arCategory.map((category, index)=>(
                    <Chip className="text-xs" key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
            {
            locale === 'en' && (
              <div className="flex flex-row gap-1 justify-start sm:!mx-8 mx-4">
                {
                  enCategory.map((category,index)=>(
                    <Chip className="text-xs" key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
            {
            locale === 'ru' && (
              <div className="flex flex-row gap-1 justify-start sm:!mx-8 mx-4">
                {
                  ruCategory.map((category, index)=>(
                    <Chip className="text-xs" key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
        <h2 className="hover:underline decoration-primary sm:!mx-8 mx-4 sm:!text-2xl text-lg font-normal">
            {locale === 'ar' ? artitle : locale === 'en' ? entitle : rutitle}
        </h2>
        <p className="sm:!mx-8 mx-4 sm:!text-sm text-xs" dangerouslySetInnerHTML={{ __html: getContentByLocale().slice(0,500) + "..." as any }}></p>
        <div className="sm:!mx-8 mx-4 flex items-center gap-1 text-xs justify-start">
          <PiClockBold />
          <span>{formatDate}</span>
        </div>
      </div>
      <div className="mt-8">
        <LatestAds />
      </div>
    </div>
  );
};

const SkeletonImportantCard = () => {
  return (
    <div className="w-[100%] space-y-5 border rounded mt-4">
      <Skeleton className="rounded-t xl:!h-[360px] lg:!h-[300px] sm:!h-[350px] h-[250px] w-full">
        <div className="h-full bg-default-300"></div>
      </Skeleton>
      <div className="px-3 flex gap-3 justify-start">
        <Skeleton className="w-1/5 rounded-3xl">
          <div className="h-8 w-1/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-3xl">
          <div className="h-8 w-2/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <div className="space-y-3 px-3">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-3 w-5/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>

      <div className="px-3 pb-3 pt-4">
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </div>
  );
};
