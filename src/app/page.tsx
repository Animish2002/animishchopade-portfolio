import Nav from "@/Portfolio/Nav";
import Hero from "@/Portfolio/Hero";
import Marquee from "@/Portfolio/Marquee";
import Work from "@/Portfolio/Work";
import About from "@/Portfolio/About";
import Career from "@/Portfolio/Career";
import Contact from "@/Portfolio/Contact";
import Footer from "@/Portfolio/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-[96rem]">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Career />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
