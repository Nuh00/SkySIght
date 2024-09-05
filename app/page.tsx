"use client";
 
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useContext } from "react";
import HeroSection from "./components/LandingPage/HeroSection";
import LandingCards from "./components/LandingPage/LandingCards";
import { auth } from "@/auth";
function Home() {


    

  return (
    <>
      <HeroSection />
      <LandingCards />
    </>
  );
}

export default Home;
