import AllAds from '../components/AllAds';
import LatestArticles from '../components/LatestArticles';
import Partners from '../components/Partners';
import LatestAds from '../components/LatestAds';

export default function Home() {

  return (
    <main>
      <div>
        <LatestAds/>
        <LatestArticles/>
        <Partners/>
        <AllAds/>
      </div>
    </main>
  )
}
