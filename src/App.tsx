import Nav from "./components/Nav";
import Hero from "./components/Hero";
import PodcastStrip from "./components/PodcastStrip";
import FlagshipCourse from "./components/FlagshipCourse";
import StoryStats from "./components/StoryStats";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PodcastStrip />
        <FlagshipCourse />
        <StoryStats />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
