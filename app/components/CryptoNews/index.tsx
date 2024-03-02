"use client";

import { getAllNews } from "@/app/services/getAllNews";
import { useQuery } from "@tanstack/react-query";
import LatestPosts from "../Shared/LatestPosts";
import AllPosts from "../Shared/AllPosts";
import { useState } from "react";
import { getLatestNews } from "@/app/services/getLatestNews";

const CryptoNewsCom = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: allData,
    isError: allError,
    isLoading: allLoading,
  } = useQuery({
    queryKey: ["news", "all", currentPage],
    queryFn: () => getAllNews(currentPage),
  });

  const {
    data: latestData,
    isError: latestError,
    isLoading: latestLoading,
  } = useQuery({
    queryKey: ["news", "latest"],
    queryFn: getLatestNews,
  });

  return (
    <div>
      <LatestPosts data={latestData?.posts} isLoading={latestLoading} />
      <AllPosts
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={allData?.totalPages}
        data={allData?.posts}
        isLoading={allLoading}
      />
    </div>
  );
};

export default CryptoNewsCom;
