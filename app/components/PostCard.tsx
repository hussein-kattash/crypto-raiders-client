"use client";
import { Card, CardBody, CardFooter, Image, Button, Chip } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { LuClock3 } from "react-icons/lu";
import { TbCircleArrowRight } from "react-icons/tb";
import { TbCircleArrowLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";


type Props = {
  _id:string;
  image:string;
  artitle:string;
  entitle:string;
  rutitle:string;
  arCategory:String[];
  ruCategory:String[];
  enCategory:String[];
  date:Date | String;
}

const PostCard = ({image, entitle, rutitle, artitle, date, _id, arCategory, ruCategory, enCategory}:Props) => {
  const locale = useLocale();
  let t = useTranslations("PostCard");

  const formattedDate = new Date(date as Date);
  
  const formattedDateString = formattedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const router = useRouter()

  return (
      <Card
        className="w-[100%] min-h-[350px] flex flex-col justify-start"
        shadow="sm"
      >
        <CardBody className="overflow-visible p-0">
          {
            image ? (
              <Image
            width="100%"
            className="w-full rounded-none h-[140px]"
            src={image}
          />
            ):(
              <Image
              width="100%"
              className="w-full rounded-none h-[140px]"
              src='/no-image-placeholder-6f3882e0.webp'/>
            )
          }
           {
            locale === 'ar' && (
              <div className="px-3 pt-2 flex justify-start gap-2 flex-wrap">
                {
                  arCategory.map((category, index)=>(
                    <Chip key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
            {
            locale === 'en' && (
              <div className="px-3 pt-2 flex justify-start gap-2 flex-wrap">
                {
                  enCategory.map((category,index)=>(
                    <Chip key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
            {
            locale === 'ru' && (
              <div className="px-3 pt-2 flex justify-start gap-2 flex-wrap">
                {
                  ruCategory.map((category, index)=>(
                    <Chip key={index} color="primary">{category}</Chip>
                  ))
                }
              </div>
            )
           }
          <div
            className={
              locale === "ar" ? "text-right px-3 pt-2" : "text-left px-3 pt-2"
            }
          >
            <p className="font-medium"> 
              {locale === 'ar' ? artitle : locale === 'en' ? entitle : rutitle}
            </p>
            <div className="flex mt-2 items-center text-sm gap-1 justify-start">
              <LuClock3 />
              <span>{formattedDateString}</span>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start justify-start">
              <Button
                color="primary"
                endContent={locale === "ar"? <TbCircleArrowLeft className="text-lg" /> : <TbCircleArrowRight className="text-lg" />}
                variant="bordered"
                className="hover:bg-primary hover:text-white"
                onClick={() => {router.push(`/post/${_id}`)}}
              >
                {t("btnName")}
              </Button>
        </CardFooter>
      </Card>
  );
};

export default PostCard;
