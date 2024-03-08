"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllAds } from "../services/getAllAds";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useTranslations } from "next-intl";

const AllAds = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["allads"],
    queryFn: getAllAds,
  });

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
  },
  [
    (slider) => {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 4000)
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on("dragStarted", clearNextTimeout)
      slider.on("animationEnded", nextTimeout)
      slider.on("updated", nextTimeout)
    },
  ]
  )

  const t = useTranslations("LatestAds")

 

  return (
    <div className="mt-12 flex flex-col justify-center items-center mx-auto lg:!w-[60%] sm:!w-[80%] w-[100%]">
      <span className="text-xs text-center">- {t("title")} -</span>
      {data && !isLoading && (
        <div ref={ref} className="keen-slider m-2 rounded">
          {data.map((ads, idx) => (
            <a
              href={ads.link}
              target="_blank"
              key={idx}
              className="keen-slider__slide number-slide1 sm:!w-[500px] w-[100%] h-[50px] sm:!h-[100px]"
            >
              <img className="h-full w-full" src={ads.image} />
            </a>
          ))} 
        </div>
      )}
    </div>
  );
};

export default AllAds;
