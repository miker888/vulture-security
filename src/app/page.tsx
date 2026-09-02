import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestPosts from "@/components/LatestPosts";
import Partners from "@/components/Partners";
import Services from "@/components/Services";

// The News & Updates block reads from Supabase. Without this the list is baked
// in at build time and a newly published post never appears here.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Partners />
        <LatestPosts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
