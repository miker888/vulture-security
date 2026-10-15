import About from "@/components/About";
import Contact from "@/components/Contact";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestPosts from "@/components/LatestPosts";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import ServicesStrip from "@/components/ServicesStrip";
import Standard from "@/components/Standard";
import WhoWeProtect from "@/components/WhoWeProtect";
import { getPublishedPosts } from "@/lib/posts";

export default function Home() {
  const showNews = getPublishedPosts().length > 0;

  return (
    <>
      <Header showNews={showNews} />
      <main>
        <Hero />
        <ServicesStrip />
        <Services />
        <WhoWeProtect />
        <About />
        <Standard />
        <Partners />
        <LatestPosts />
        <CtaBand />
        <Contact />
      </main>
      <Footer showNews={showNews} />
    </>
  );
}
