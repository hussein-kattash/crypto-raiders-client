"use client"
import { getLatestTutorials } from "@/app/services/getLatestTutorials";
import { Button, Card, Chip, Skeleton, skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { PiClockBold } from "react-icons/pi";
import { TbCircleArrowRight } from "react-icons/tb";
import { TbCircleArrowLeft } from "react-icons/tb";

const ImportantExplanations = () => {
  const t = useTranslations("ImportantExplanations");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["tutorials"],
    queryFn: getLatestTutorials,
  });
  const skeletons = [1,2,3];
  return (
    <div>
      <h2 className="text-2xl mt-1">{t("title")}</h2>
      <div className="mt-4 flex lg:!flex-col sm:!flex-row flex-col gap-4">
        {
          isLoading && (
            skeletons.map((skeleton)=>(
              <div key={skeleton} className="w-full">
                <SkeletonImportantExplanationsCard/>
              </div>
            ))
          )
        }
        {
          (!isLoading && data) && (
            data.posts.slice(0,3).map((post)=>(
              <div key={post._id}>
                <ImportantExplanationsCard 
                _id={post._id}
                image={post.image}
                entitle={post.title.en}
                artitle={post.title.ar}
                rutitle={post.title.ru}
                enCategory={post.category.en}
                arCategory={post.category.ar}
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

export default ImportantExplanations;

type Props = {
  _id: string;
  image: string;
  artitle: string;
  entitle: string;
  rutitle: string;
  arCategory: String[];
  ruCategory: String[];
  enCategory: String[];
  date: Date | String;
};
const ImportantExplanationsCard = ({
  image,
  entitle,
  rutitle,
  artitle,
  date,
  _id,
  arCategory,
  ruCategory,
  enCategory,
}: Props) => {
  let t = useTranslations("PostCard");
  const locale = useLocale();
  const formatDate = new Date(date as Date).toLocaleDateString();
  const route = useRouter()

  return (
    <div onClick={() => route.push(`/post/${_id}`)} className="lg:!max-w-[100%] sm:max-w-[320px] w-[100%] min-h-[300px] rounded flex cursor-pointer flex-col gap-3 pb-4 bg-content1 border">
      <div className="relative">
        <img
          src={image ? image : '/no-image-placeholder-6f3882e0.webp'}
          alt={locale === "en" ? entitle : locale === "ar" ? artitle : rutitle}
          className="rounded-t w-full xl:!h-[180px] h-[140px]"
        />
        {
            locale === 'ar' && (
              <div className="absolute top-3 left-3 flex items-center gap-1 flex-wrap">
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
              <div className="absolute top-3 right-3 flex items-center gap-1 flex-wrap">
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
              <div className="absolute top-3 right-3 flex items-center gap-1 flex-wrap">
                {
                  ruCategory.map((category, index)=>(
                    <Chip className="text-xs" key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
      </div>
      <h2 className="hover:underline decoration-primary underline-primary font-normal mx-2 xl:!text-lg md:!text-base text-sm">
        {locale === 'ar' ? artitle : locale === 'en' ? entitle : rutitle}
      </h2>
      <div className="flex mx-2 items-center gap-1 text-xs justify-start">
        <PiClockBold />
        <span>{formatDate}</span>
      </div>
      {locale === "ar" ? (
        <Button
          color="primary"
          endContent={<TbCircleArrowLeft className="text-lg" />}
          variant="bordered"
          className="hover:bg-primary mx-2 hover:text-white w-[120px]"
          onClick={() => {route.push(`/post/${_id}`)}}
        >
          {t("btnName")}
        </Button>
      ) : (
        <Button
          color="primary"
          endContent={<TbCircleArrowRight className="text-lg" />}
          variant="bordered"
          className="hover:bg-primary mx-2 hover:text-white w-[120px]"
          onClick={() => {route.push(`/post/${_id}`)}}
        >
          {t("btnName")}
        </Button>
      )}
    </div>
  );
};

const SkeletonImportantExplanationsCard = () => {
  return (
    <div className="border rounded w-[100%] space-y-5 min-h-[300px]">
      <Skeleton className="xl:!h-[180px] h-[140px] rounded-t">
        <div className="h-[100%] bg-default-300"></div>
      </Skeleton>
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
          <div className="h-10 w-2/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </div>
  );
};
