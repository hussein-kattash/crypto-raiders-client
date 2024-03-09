"use client";
import { useLocale, useTranslations } from "next-intl";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "../services/getAllPartners";

const animation = { duration: 15000, easing: (t: number) => t };

const Partners = () => {
  const local = useLocale();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: getAllPartners,
  });

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView:window.innerWidth > 768 ?  4 : 3,
      spacing: 10,
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  const t = useTranslations("Partners");

  return (
    <div className="mt-12 border-t-5 border-primary pt-2">
      <h2 className="text-xl font-semibold w-full">
        {t("title")}
      </h2>
      {data && !isLoading && (
        <div ref={sliderRef} className="keen-slider mt-6">
          {data?.map((partner, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${index} flex flex-col items-center justify-center`}
            >
              <img
                src={partner.image}
                className="lg:!w-36 lg:!h-36 md!:w-32 md:!h-26 w-16 h-16 rounded-[50%]"
              />
              <span className="flex flex-wrap text-center justify-center mt-3 lg:!text-xl md:!text-base  sm:!text-sm text-xs sm:!font-bold font-normal">{partner.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Partners;
