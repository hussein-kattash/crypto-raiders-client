"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllAds } from "../services/getAllAds";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const AllAds = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["allads"],
    queryFn: getAllAds,
  });

  const [opacities, setOpacities] = React.useState<number[]>([]);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: !isLoading ? data?.length : 3,
      loop: true,
      detailsChanged(s) {
        const new_opacities = s.track.details.slides?.map(
          (slide) => slide.portion
        );
        setOpacities(new_opacities);
      },
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
          }, 4000);
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
    <div className="mt-12">
      {data && !isLoading && (
        <div ref={sliderRef} className="fader">
          {data.map((ads, idx) => (
            <a
              href={ads.link}
              target="_blank"
              key={idx}
              className="fader__slide"
              style={{ opacity: opacities[idx] }}
            >
              <img className="w-[800px] h-[100px]" src={ads.image} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAds;
