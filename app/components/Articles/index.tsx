"use client";
import React, { useContext, useEffect, useState } from "react";
import { getAllPosts } from "@/app/services/getAllPosts";
import { useQuery } from "@tanstack/react-query";
import LatestPosts from "../Shared/LatestPosts";
import AllPosts from "../Shared/AllPosts";
import { getLatestPosts } from "@/app/services/getLatestPosts";

const Articles = () => {
  const [currentPage,setCurrentPage] = useState(1);
  const { data: allData, isError: allError, isLoading: allLoading } = useQuery({
    queryKey: ["allposts", "all",currentPage],
    queryFn:()=> getAllPosts(currentPage),
  });

 
  const { data: latestData, isError: latestError, isLoading: latestLoading } = useQuery({
    queryKey: ["allposts", "latest"],
    queryFn: getLatestPosts,
  });

  return (
    <div>
      <LatestPosts data={latestData?.posts} isLoading={latestLoading} />
      <AllPosts setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={allData?.totalPages} data={allData?.posts} isLoading={allLoading} />
    </div>
  );
};

export default Articles;

