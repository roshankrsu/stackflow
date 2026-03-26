import Image from "next/image";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";

export default function Home() {
  return (
    <div className="pb-20">
      <HeroSection />
      <LatestQuestions />
      <TopContributers />
    </div>
  );
}
