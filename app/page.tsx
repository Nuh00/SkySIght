"use client";

import Navbar from "./components/LandingPage/Navbar";
import HeroSection from "./components/LandingPage/HeroSection";
import LandingCards from "./components/LandingPage/LandingCards";
function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LandingCards />
    </>
  );
}

export default Home;
