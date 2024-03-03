"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useLocale, useTranslations } from "next-intl";
import { TbCircleArrowRight } from "react-icons/tb";
import { TbCircleArrowLeft } from "react-icons/tb";
import { useState } from "react";

const animation = { duration: 10000, easing: (t: number) => t };

const SocialMediaChannel = () => {
  const t = useTranslations("channels");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const local = useLocale();
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
      rtl: local === "ar" ? false : true,
      slides: {
        perView: window.innerWidth > 1000 ? 5 : window.innerWidth > 700 ? 4 : 3,
        spacing: window.innerWidth > 1000 ? 16 : 8,
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
          }, 2000);
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

  const channels = [
    {
      key:1,
      link: "https://t.me/CryptoRaider5",
      image: "/channel2.jpg",
      name: "channel1",
    },
    {
      key:2,
      link: "https://t.me/Crypto7RaidersCH",
      image: "/channel2.jpg",
      name: "channel2",
    },
    {
      key:3,
      link: "https://t.me/CryptoRaidersChart",
      image: "/channel1.jpg",
      name: "channel3",
    },
    {
      key:4,
      link: "https://t.me/CryptoRaidersAirdrop",
      image: "/channel3.png",
      name: "channel4",
    },
    {
      key:5,
      link: "https://twitter.com/Crypto7Raiders",
      image: "/twitter.png",
      name: "channel5",
    },
    {
      key:6,
      link: "https://youtube.com/@YazanMarouf?si=G6EEFHC4ZJQIoeZm",
      image: "/youtube.png",
      name: "channel6",
    },
  ];

  return (
    <div className="mt-20 relative">
      <div ref={sliderRef} className="keen-slider">
        {channels.map((channel, idx) => (
          <a
            key={channel.key}
            target="_blank"
            href={channel.link}
            className={`keen-slider__slide number-slide${channel.key} flex flex-col items-center justify-center`}
          >
            <img src={channel.image} className="md:!w-[90px] w-[50px] rounded-[50%]" />
            <span className="md:!text-md sm:!text-sm text-xs text-center">{t(channel.name)}</span>
          </a>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <TbCircleArrowLeft
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            className="absolute left-0 top-[40%] text-2xl text-primary cursor-pointer"
          />

          <TbCircleArrowRight
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            className="absolute right-0 top-[40%] text-2xl text-primary cursor-pointer font-bold"
          />
        </>
      )}
    </div>
  );
};

export default SocialMediaChannel;
