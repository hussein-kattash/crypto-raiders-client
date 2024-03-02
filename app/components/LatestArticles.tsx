"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import PostCard from "./PostCard";
import SkeletonPostCard from "./SkeletonPostCard";
import { getAllPosts } from "../services/getAllPosts";
import { getLatestPosts } from "../services/getLatestPosts";
import { useQuery } from "@tanstack/react-query";

const LatestArticales = () => {
  const t = useTranslations("LatestArticles");

  const skeleton = [1, 2, 3, 4];

  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getLatestPosts,
  });

  const locale = useLocale();

  return (
    <div className="mt-12  rounded-xl p-4">
      <h2 className={`text-xl font-semibold border-b-1 border-primary ${locale ==='ru' ? 'w-[190px]' :'w-[150px]'}`}>
        {t("title")}...
      </h2>
      <div className="mt-6 grid grid-cols-12 gap-4">
        {isLoading
          ? skeleton.map((item) => (
              <div
                key={item}
                className="xl:!col-span-3 lg:!col-span-4 sm:!col-span-6 col-span-12"
              >
                <SkeletonPostCard />
              </div>
            ))
          : data?.posts.map((post, index) => (
              <div
                key={index}
                className="xl:!col-span-3 lg:!col-span-4 sm:!col-span-6 col-span-12"
              >
                <PostCard
                  _id={post._id}
                  image={post.image}
                  date={post.createdAt}
                  artitle={post.title.ar}
                  entitle={post.title.en}
                  rutitle={post.title.ru}
                  arCategory={post.category.ar}
                  enCategory={post.category.en}
                  ruCategory={post.category.ru}
                />
              </div>
            )
            )}
      </div>
    </div>
  );
};

export default LatestArticales;
