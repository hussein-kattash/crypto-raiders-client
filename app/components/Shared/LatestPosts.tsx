"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useEffect, useState } from "react";
import PostCard from "../PostCard";
import { useLocale } from "next-intl";
import { TbCircleArrowRight } from "react-icons/tb";
import { TbCircleArrowLeft } from "react-icons/tb";
import SkeletonPostCard from "../SkeletonPostCard";
import { PostModel } from "@/app/models/PostModel";

type Props = {
  data: PostModel[] | undefined;
  isLoading: boolean;
};

const LatestPosts = ({ data, isLoading }: Props) => {
  const local = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  let [skeletons, setSkeletons] = useState([1, 2, 3, 4]);
 
  const [loaded, setLoaded] = useState(false);
  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
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
        perView:window.innerWidth > 1280 ? 4 : window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1,
        spacing:16,
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

  useEffect(()=>{
      if(window.innerWidth > 1280){
        setSkeletons([1,2,3,4]);
      }else if(window.innerWidth > 1024){
        setSkeletons([1,2,3]);
      }else if(window.innerWidth > 600){
        setSkeletons([1,2]);
      }else{
        setSkeletons([1]);
      }
  },[window.innerWidth])

  return (
    <div className="mt-10 relative">
      {isLoading && (
        <div className="grid grid-cols-12 w-full gap-4">
          {skeletons.map((skeleton) => (
            <div key={skeleton} className="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12">
              <SkeletonPostCard />
            </div>
          ))}
        </div>
      )}
      {data && !isLoading && (
        <div ref={ref} className="keen-slider w-full py-4">
          {data?.map((post, index) => (
            <div
              key={index}
              className={`keen-slider__slide number-slide${index + 1}`}
            >
              <PostCard
                _id={post._id}
                image={post.image}
                date={post.createdAt}
                artitle={post.title.ar}
                entitle={post.title.en}
                rutitle={post.title.ru}
                arCategory={post.category.ar}
                enCategory={post.category.en}
                ruCategory={post.category.ru}
              />
            </div>
          ))}
        </div>
      )}
      {loaded && instanceRef.current && (
        <>
          <TbCircleArrowLeft
            onClick={(e: any) =>
              e.stopPropagation() || local === "ar"
                ? instanceRef.current?.next()
                : instanceRef.current?.prev()
            }
            className="absolute md:block hidden left-[-40px]  top-[40%] text-2xl text-primary cursor-pointer"
          />

          <TbCircleArrowRight
            onClick={(e: any) =>
              e.stopPropagation() || local === "ar"
                ? instanceRef.current?.prev()
                : instanceRef.current?.next()
            }
            className="absolute top-[40%] md:block hidden right-[-40px] text-2xl text-primary cursor-pointer font-bold"
          />
        </>
      )}
    </div>
  );
};

export default LatestPosts;
