import { useState } from "react";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Flagship from "./components/Flagship";
import Ventures from "./components/Ventures";
import Why from "./components/Why";
import Reels from "./components/Reels";
import Contact from "./components/Contact";
import Stats from "./components/Stats";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <Intro onDismiss={() => setIntroDone(true)} />}

      <Navbar />
      <main>
        <Hero />
        <Flagship />
        <Ventures />
        <Reels />
        <Why />
        <Stats />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
