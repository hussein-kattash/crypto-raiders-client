import { Skeleton, skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { getLatestPosts } from "../services/getLatestPosts";
import { useParams, useRouter } from "next/navigation";

const RecentlyPublished = () => {
  const t = useTranslations("recentlyPuplished");
  const locale = useLocale();
  const route = useParams()
  const { data, isError, isLoading } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: getLatestPosts,
  });
  let skeletons = [1, 2, 3];

  return (
    <div>
      <h2 className="text-2xl font-bold mt-2">{t("title")}</h2>
      <div className="flex flex-col w-full mt-4 gap-4">
        {isLoading &&
          skeletons.map((skeleton) => (
            <div key={skeleton}>
              <SkeletonRecentlyPublished />
            </div>
          ))}
        {data &&
          !isLoading &&
          data.posts.filter((post)=> post._id !== route.id ).map((post) => (
            <div key={post._id}>
              <RecentlyPublishedCard
                _id={post._id}
                image={post.image}
                title={
                  locale === "ar"
                    ? post.title.ar
                    : locale === "en"
                    ? post.title.en
                    : post.title.ru
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyPublished;

type Props = {
  _id: string;
  image: string;
  title: string;
};
const RecentlyPublishedCard = ({ image, title , _id}: Props) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/post/${_id}`)} className="cursor-pointer  w-full grid grid-cols-12 items-center gap-4">
      <div className="w-full h-[80px] col-span-4">
        <img className="w-full h-[80px]" src={image} alt={title} />
      </div>
      <div className="col-span-8">
        <p className="text-sm hover:underline hover:decoration-primary">
          {title}
        </p>
      </div>
    </div>
  );
};

const SkeletonRecentlyPublished = () => {
  return (
    <div className="flex w-full items-center gap-4">
      <Skeleton className="w-[170px] h-[80px]">
        <div className="h-[80px] w-[170px] bg-default-300"></div>
      </Skeleton>
      <div className="flex flex-col gap-3 w-full">
        <Skeleton className="h-3 w-4/5 rounded-3xl">
          <div className="h-3 w-4/5 bg-default-300"></div>
        </Skeleton>
        <Skeleton className="h-3 w-3/5 rounded-3xl">
          <div className="h-3 w-3/5 bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
};
