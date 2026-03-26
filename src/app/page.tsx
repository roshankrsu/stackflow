import { unstable_noStore } from "next/cache";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";

export default async function Home() {
  unstable_noStore(); // disables caching
  return (
    <div className="pb-20">
      <HeroSection />
      <LatestQuestions />
      <TopContributers />
    </div>
  );
}
