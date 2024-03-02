"use client";
import { useLocale, useTranslations } from "next-intl";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useQuery } from "@tanstack/react-query";
import { getAllPartners } from "../services/getAllPartners";

const animation = { duration: 12000, easing: (t: number) => t };

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
      perView: 3,
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
    <div className="mt-12 rounded-xl p-4">
      <h2 className="text-xl font-semibold border-b-1 border-primary w-20">
        {t("title")}:
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
                className="lg:!w-44 lg:!h-44 md!:w-32 md:!h-32 w-20 h-20 rounded-[50%]"
              />
              <span className="flex flex-wrap justify-center mt-3 md:text-xl sm:text-sm text-xs font-bold">{partner.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Partners;
