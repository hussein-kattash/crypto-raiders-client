import AllAds from "../components/AllAds";
import LatestArticles from "../components/LatestArticles";
import Partners from "../components/Partners";
import LatestAds from "../components/LatestAds";
import Main from "../components/Main";
import MiscellaneousArticles from "../components/MiscellaneousArticles";

export default function Home() {
  return (
    <main>
      <div>
        <LatestAds />
        <Main />
        <MiscellaneousArticles />
        <Partners />
        <AllAds/>
      </div>
    </main>
  );
}
