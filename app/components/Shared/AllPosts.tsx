"use client";
import { PostModel } from "@/app/models/PostModel";
import { Chip, Pagination, Skeleton } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { LuClock3 } from "react-icons/lu";
import { PartnersContext } from "@/app/context/partnersContext";
import { title } from "process";

type AllPostsProps = {
    data:PostModel[] | undefined,
    isLoading:boolean;
    totalPages:number | undefined;
    currentPage:number;
    setCurrentPage:Dispatch<SetStateAction<number>>
}

const AllPosts = ({data,isLoading,totalPages,currentPage,setCurrentPage}:AllPostsProps) => {
  const skeletons = [1, 2, 3];
 
  return (
    <div>
      {isLoading && (
        <div className="mt-10 flex flex-col gap-6">
          {skeletons.map((skeleton) => (
            <div key={skeleton}>
              <SkeletonNewsCard />
            </div>
          ))}
        </div>
      )}
      {data && !isLoading && (
        <div className="flex flex-col mt-10 gap-6">
          {data.map((post) => (
            <div key={post._id}>
              <NewsCard
                _id={post._id}
                image={post.image}
                artitle={post.title.ar}
                entitle={post.title.en}
                rutitle={post.title.ru}
                arCategory={post.category.ar}
                enCategory={post.category.en}
                ruCategory={post.category.ru}
                date={post.createdAt}
              />
            </div>
          ))}
          <div className="flex justify-center mt-10">
            <Pagination  onChange={setCurrentPage} page={currentPage} showShadow color="primary" total={totalPages as number}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;

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
const NewsCard = ({
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
  const locale = useLocale();

  const formatDate = new Date(date as Date).toLocaleDateString();
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/post/${_id}`)} className="grid grid-cols-12 gap-4 items-center cursor-pointer">
      <div className="md:!col-span-3 col-span-4">
        <img className="rounded sm:!h-[160px] h-[100px] w-full" src={image ? image : '/no-image-placeholder-6f3882e0.webp'} />
      </div>
      <div className="md:!col-span-6 col-span-8 flex flex-col sm:!gap-3 gap-1">
        {locale === "ar" && (
          <div className="flex justify-start flex-wrap gap-2 items-center">
            {arCategory.map((category, index) => (
              <Chip key={index} color="primary" className="sm:!text-sm text-xs">
                {category}
              </Chip>
            ))}
          </div>
        )}
        {locale === "en" && (
          <div className="flex justify-start gap-2 items-center flex-wrap">
            {enCategory.map((category, index) => (
              <Chip key={index} color="primary" className="sm:!text-sm text-xs">
                {category}
              </Chip>
            ))}
          </div>
        )}
        {locale === "ru" && (
          <div className="flex justify-start gap-2 items-center flex-wrap">
            {ruCategory.map((category, index) => (
              <Chip key={index} color="primary" className="sm:!text-sm text-xs">
                {category}
              </Chip>
            ))}
          </div>
        )}
        <p className="font-medium sm:text-md text-sm hover:underline hover:decoration-primary">
          {locale === "ar" ? artitle : locale === "en" ? entitle : rutitle}
        </p>
        <div className="flex flex-row items-center gap-1">
          <LuClock3 />
          <span className="text-sm">{formatDate}</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonNewsCard = () => {
  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <Skeleton className="md:!col-span-3 col-span-4 rounded">
        <div className="sm:!h-[160px] h-[100px] w-full rounded bg-default-300"></div>
      </Skeleton>
      <div className="md:!col-span-6 col-span-8 flex flex-col sm:!gap-3 gap-2">
        <div className="flex gap-3 justify-start">
          <Skeleton className="w-[90px] rounded-3xl">
            <div className="h-8 w-[90px] rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-[110px] rounded-3xl">
            <div className="h-8 w-[110px] rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
        <Skeleton className="h-3 w-4/5 rounded-3xl">
          <div className="h-3 w-4/5 bg-default-300"></div>
        </Skeleton>
        <Skeleton className="h-3 w-3/5 rounded-3xl">
          <div className="h-3 w-3/5 bg-default-300"></div>
        </Skeleton>
        <Skeleton className="h-3 w-[100px] rounded-3xl">
          <div className="h-3 w-[100px] bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
};