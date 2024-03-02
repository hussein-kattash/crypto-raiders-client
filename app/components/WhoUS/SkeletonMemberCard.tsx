import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonMemberCard = () => {
  let skeletons = [1, 2, 3, 4, 5];
  return (
    <Card className="w-[320px] h-[370px]">
      <CardBody className="flex flex-col items-center mt-8">
        <Skeleton className="rounded-[50%]">
          <div className="w-[140px] h-[140px] rounded-[50%] bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-[140px] mt-4 rounded-lg">
          <div className="h-4 w-[140px] rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-[100px] mt-2 rounded-lg">
          <div className="h-4 w-[100px] rounded-lg bg-default-200"></div>
        </Skeleton>
      </CardBody>
      <CardFooter className="flex mb-8 flex-row justify-center gap-4">
        {skeletons.map((skeleton) => (
          <Skeleton key={skeleton} className="w-[35px] mt-2 rounded-[50%]">
            <div className="h-[35px] w-[35px] rounded-[50%] bg-default-200"></div>
          </Skeleton>
        ))}
      </CardFooter>
      {/* <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div> */}
    </Card>
  );
};

export default SkeletonMemberCard;
