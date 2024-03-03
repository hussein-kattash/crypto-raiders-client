"use cleint"
import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonCardDetails = () => {
  return (
    <div className="w-[100%] h-[700px] flex flex-col items-start gap-8 p-4 col-span-9">
      <Skeleton className="w-[100%] rounded">
        <div className="h-10 bg-default-300"></div>
      </Skeleton>
      <div className="flex justify-start gap-2 w-[100%]">
      <Skeleton className="w-[120px] rounded-3xl">
          <div className="h-8 w-[120px] rounded-3xl bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-[100px] rounded-3xl">
          <div className="h-8 w-[100px] rounded-3xl bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-[130px]  rounded-3xl">  
          <div className="h-8 w-[130px]  rounded-3xl bg-default-300"></div>
        </Skeleton>
      </div>
      <Skeleton className="sm:!h-[400px] h-[220px] rounded w-[100%]">
        <div className="bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 px-3 w-[100%]">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-4 w-5/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">  
          <div className="h-4 w-3/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">  
          <div className="h-4 w-5/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">  
          <div className="h-4 w-4/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        </div>
    </div>
  );
};

export default SkeletonCardDetails;
