import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function SkeletonPostCard() {
  return (
    <Card className="w-[100%] space-y-5 h-[352px]" radius="lg">
      <Skeleton className="h-[170px]">
        <div className="h-24 bg-default-300"></div>
      </Skeleton>
      <div className="px-3 flex gap-3 justify-start">
      <Skeleton className="w-1/5 rounded-3xl">
          <div className="h-8 w-2/5 rounded-lg bg-default-200"></div>
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
          <div className="h-10 w-2/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      </div>
    </Card>
  );
}

