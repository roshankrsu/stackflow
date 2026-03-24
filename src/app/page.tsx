import Image from "next/image";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />

      <HeroSection />

      <LatestQuestions />

      <TopContributers />

      <Footer />
    </div>
  );
}
