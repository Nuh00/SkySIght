"use client";
 
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useContext } from "react";
import HeroSection from "./components/LandingPage/HeroSection";
import LandingCards from "./components/LandingPage/LandingCards";
import { auth } from "@/auth";
import Footer from './components/Footer';
function Home() {


    

  return (
    <>
      <HeroSection />
      <Footer />
      
    </>
  );
}
export default Home;

