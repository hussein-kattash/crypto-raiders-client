"use client";
import Link from "next/link";
import React from "react";
import { getLatestAds } from "../services/getLatestAds";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const LatestAds = () => {
  const t = useTranslations("LatestAds");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: getLatestAds,
  });

  return (
    <div className="my-4">
      {data && !isLoading && (
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xs">- {t("title")} -</span>
          <a
            href={data[0].link}
            target="_blank"
            className="flex justify-center w-full"
          >
            <img
              src={data[0].image}
              className="sm:!w-[500px] w-[100%] h-[50px] sm:!h-[70px]"
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default LatestAds;
