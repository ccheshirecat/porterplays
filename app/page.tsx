import HeroSection from "@/components/HeroSection";
import StatisticsSection from "@/components/Statistics";
import Image from "next/image";

export default function Home() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-center bg-background">
    <HeroSection></HeroSection>
    <StatisticsSection></StatisticsSection>

    
  </main>
  );
}
