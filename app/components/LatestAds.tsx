"use client";
import Link from "next/link";
import React from "react";
import { getLatestAds } from "../services/getLatestAds";
import { useQuery } from "@tanstack/react-query";

const LatestAds = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["ads"],
    queryFn: getLatestAds,
  });

  return (
    <div className="my-4">
      {data && !isLoading && (
        <a
          href={data[0].link}
          target="_blank"
          className="flex justify-center w-full"
        >
          <img src={data[0].image} className="w-[800px] h-[100px]" />
        </a>
      )}
    </div>
  );
};

export default LatestAds;
