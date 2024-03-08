"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ImFire } from "react-icons/im";
import { TbCircleArrowRight } from "react-icons/tb";
import { TbCircleArrowLeft } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { getLatestNews } from "../services/getLatestNews";
// import { getAllNews } from "../services/getLatestNews";

const LatestNews = () => {
  const locale = useLocale();
  let t = useTranslations("LatestNews");
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: getLatestNews,
  });

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div className="flex w-[100%] items-center px-[5%] pt-4">
      <h2 className="w-[20%] sm:!text-lg text-sm font-semibold flex justify-start items-center gap-2">
        <ImFire className="text-primary" />
         {t("title")} 
      </h2>
      <div className="w-[80%]  flex items-center">
        {data && !isLoading && (
          <div ref={sliderRef} className="keen-slider">
            {data.posts.map((item, index) => (
              <div
                key={index}
                className={`keen-slider__slide number-slide${index + 1} flex justify-start  text-xs md:!text-sm`}
              >
                {locale === 'ar' ? item.title.ar : locale === "en" ? item.title.en : item.title.ru}
              </div>
            ))}
          </div>
        )}
        {loaded && instanceRef.current && (
          <>
            <TbCircleArrowLeft
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              // disabled={currentSlide === 0}
              className="text-2xl text-primary cursor-pointer"
            />

            <TbCircleArrowRight
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              className="text-2xl text-primary cursor-pointer font-bold"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
