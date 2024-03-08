import React from "react";
import Important from "./Important";
import ImportantExplanations from "./ImportantExplanations";
import LatestNews from "./LatestNews";

const Main = () => {
  return (
    <div className="border-t border-t-gray-500 pt-4 w-full mt-8 grid gap-4 grid-cols-12">
      <div className="lg:!col-span-3 col-span-12 border-t-5">
        <ImportantExplanations />
      </div>
      <div className="lg:!col-span-6 col-span-12 border-t-5 border-primary">
        <Important />
      </div>
      <div className="lg:!col-span-3 col-span-12">
        <LatestNews />
      </div>
    </div>
  );
};

export default Main;
