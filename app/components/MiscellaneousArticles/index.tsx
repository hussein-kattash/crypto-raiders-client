"use client"
import { getLatestTwentyPosts } from "@/app/services/getLatestTwentyPosts";
import { Card, CardBody, Chip, Image, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiClockBold } from "react-icons/pi";
import { TbCircleArrowLeft, TbCircleArrowRight } from "react-icons/tb";

const MiscellaneousArticles = () => {
  const t = useTranslations("MiscellaneousArticles");
  const tt = useTranslations("PostCard");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["latesttwentyposts"],
    queryFn:getLatestTwentyPosts,
  });

  const locale = useLocale();
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <div className="mt-8 border-t-5 border-primary">
      <div className="flex justify-start pt-1">
        <h2>{t("title")}</h2>
      </div>
      <div className="mt-4 grid grid-cols-12 sm:!gap-8 gap-4">
        {isLoading &&
          skeletons.map((skeleton) => (
            <div key={skeleton} className="lg:!col-span-4 sm:!col-span-6 col-span-12">
              <SkeletonMiscellaneousArticlesCard />
            </div>
          ))
          }
        {
          (!isLoading && data) && (
            data.posts.slice(0,18).map((post)=>(
              <div key={post._id} className="lg:!col-span-4 sm:!col-span-6 col-span-12">
                <MiscellaneousArticlesCard
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
            ))
          )
        }
      </div>
      <Link
          href={`/${locale}/all_articles`}
          className="flex items-center justify-center gap-2 hover:text-primary text-lg mt-8"
        >
          <span>{tt("btnName")}</span>
          {locale === "ar" ? <TbCircleArrowLeft className="text-xl" /> : <TbCircleArrowRight className="text-xl" />}
      </Link>
    </div>
  );
};

export default MiscellaneousArticles;

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

const MiscellaneousArticlesCard = ({
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

  const formattedDate = new Date(date as Date);
  const formattedDateString = formattedDate.toLocaleDateString();

  const locale = useLocale();
  const route = useRouter()
  
  return (
    <Card
      className="min-h-[330px] cursor-pointer rounded w-full pb-4 flex flex-col justify-start"
      shadow="sm"
      isPressable
      onPress={() => route.push(`/post/${_id}`)}
    >
      <CardBody className="overflow-visible p-0 flex flex-col  gap-3">
        <Image
          width="100%"
          className="w-full rounded-none h-[160px]"
          src={image ? image : "/no-image-placeholder-6f3882e0.webp"}
        />
        {locale === "ar" && (
          <div className="flex px-4 items-center justify-start gap-1 flex-wrap">
            {arCategory.map((category, index) => (
              <Chip key={index} color="primary">
                {category}
              </Chip>
            ))}
          </div>
        )}
        {locale === "en" && (
          <div className="flex px-4 items-center justify-start gap-1 flex-wrap">
            {enCategory.map((category, index) => (
              <Chip key={index} color="primary">
                {category}
              </Chip>
            ))}
          </div>
        )}
        {locale === "ru" && (
          <div className="flex px-4 items-center justify-start gap-1 flex-wrap">
            {ruCategory.map((category, index) => (
              <Chip key={index} color="primary">
                {category}
              </Chip>
            ))}
          </div>
        )}
        <h2 className="hover:underline decoration-primary font-normal text-start xl:!text-lg md:!text-base text-sm px-4">
          {locale === "ar" ? artitle : locale === "en" ? entitle : rutitle}
        </h2>
        <div className="px-4 flex items-center gap-1 text-xs justify-start">
          <PiClockBold />
          <span>{formattedDateString}</span>
        </div>
      </CardBody>
    </Card>
  );
};

const SkeletonMiscellaneousArticlesCard = () => {
  return (
    <Card className="cursor-wait min-h-[330px] rounded w-full lg:!col-span-4 sm:!col-span-6 col-span-12 flex flex-col justify-start">
      <Skeleton className="h-[170px]">
        <div className="h-24 bg-default-300"></div>
      </Skeleton>
      <div className="px-3 flex gap-3 justify-start my-3">
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
        <Skeleton className="w-[120px] rounded-lg">
          <div className="h-3 w-[120px] rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
