import React from "react";
import style from "../styles/index.module.css";
import Services from '../components/ui/Services/Services';

import HeroSection from "../components/ui/heroSection/HeroSection";

function Home() {
    return (
        <>
          <HeroSection />
          <Services/>
        </>
        
    );
    }

export default Home