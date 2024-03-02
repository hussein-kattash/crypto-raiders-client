"use client";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import MemberCard from "./MemberCard";
import SkeletonMemberCard from "./SkeletonMemberCard";
import { getAllMembers } from "@/app/services/getAllMembers";
import { useQuery } from "@tanstack/react-query";

const TeamMembers = () => {
  const t = useTranslations("team");
  const locale = useLocale();
  const skeletons = [1, 2, 3, 4];
  const { data, isError, isLoading } = useQuery({
    queryKey: ["members"],
    queryFn: getAllMembers,
  });

  return (
    <div className="mt-6">
      <h2
        className={`border-b border-primary block ${
          locale === "ar"
            ? "w-[130px]"
            : locale === "en"
            ? "w-[150px]"
            : "w-[160px]"
        }`}
      >
        {t("title")}:
      </h2>
      <div className="mt-6 flex flex-row justify-center items-center flex-wrap gap-6">
        {data &&
          !isLoading &&
          data.map((member, index) => (
            <div key={index}>
              <MemberCard
                image={member.image}
                name={member.name}
                role={member.role}
                links={member.links}
              />
            </div>
          ))}
        {isLoading &&
          skeletons.map((skeleton) => (
            <div key={skeleton}>
              <SkeletonMemberCard />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamMembers;
