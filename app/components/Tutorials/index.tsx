"use client";

import { useQuery } from "@tanstack/react-query";
import LatestPosts from "../Shared/LatestPosts";
import AllPosts from "../Shared/AllPosts";
import { getAllTutorials } from "@/app/services/getAllTutorials";
import { useState } from "react";
import { getLatestTutorials } from "@/app/services/getLatestTutorials";

const Tutorials = () => {
  // const { data, isError, isLoading } = useQuery({
  //   queryKey: ["allNews"],
  //   queryFn: getAllTutorials,
  // });
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: allData,
    isError: allError,
    isLoading: allLoading,
  } = useQuery({
    queryKey: ["tutorials", "all", currentPage],
    queryFn: () => getAllTutorials(currentPage),
  });

  const {
    data: latestData,
    isError: latestError,
    isLoading: latestLoading,
  } = useQuery({
    queryKey: ["tutorials", "latest"],
    queryFn: getLatestTutorials,
  });
  return (
    <div>
      <LatestPosts data={latestData?.posts} isLoading={latestLoading} />
      <AllPosts
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={allData?.totalPages}
        data={allData?.posts}
        isLoading={allLoading}
      />
    </div>
  );
};

export default Tutorials;
