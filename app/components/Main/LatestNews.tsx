"use client"
import { getLatestNews } from "@/app/services/getLatestNews";
import { Skeleton, skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { PiClockBold } from "react-icons/pi";

const LatestNews = () => {
  const t = useTranslations("LatestNews");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: getLatestNews,
  });
  const skeletons = [1,2,3,4];

  return (
    <div>
      <h2 className="border-t border-b py-2 text-2xl">{t("title")}</h2>
      <div className="mt-4 flex-col">
        {
          isLoading && (
            skeletons.map((skeleton)=>(
              <div key={skeleton}>
                <SkeletonLatestNewsCard/>
              </div>
            ))
          )
        }
        {
          (!isLoading && data) && (
            data.posts.map((post)=>(
              <div key={post._id}>
                <LatestNewsCard 
                _id={post._id} 
                artitle={post.title.ar}
                entitle={post.title.en}
                rutitle={post.title.ru}
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

export default LatestNews;

type Props = {
  _id:string;
  artitle: string;
  entitle: string;
  rutitle: string;
  date: Date | string;
};
const LatestNewsCard = ({_id,artitle,entitle,rutitle,date}:Props) => {
  const locale = useLocale();
  const route = useRouter();
  const formattedDate = new Date(date as Date);
  const formattedDateString = formattedDate.toLocaleDateString();
  const t = useTranslations("LatestNews");

  return (
    <div className="border-b pb-4 mb-6">
      <h2 onClick={() => route.push(`/post/${_id}`)} className="xl:!text-lg sm:!text-base text-sm font-medium cursor-pointer hover:underline decoration-primary">
        {locale === 'ar' ? artitle : locale === 'en' ? entitle : rutitle}
      </h2>
      <div className="text-xs flex justify-start items-center gap-1 mt-4">
        <span className="">{t("news")}</span> -
        <div className="flex items-center gap-1 justify-start">
          <PiClockBold />
          <span>{formattedDateString}</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonLatestNewsCard = () => {
  return (
    <div className="flex flex-col border-b pb-4 mb-6">
      <div className="gap-1 flex flex-col">
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-3 w-5/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <Skeleton className="w-[140px] rounded-lg mt-6">
        <div className="h-3 w-[140px] rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  );
};
