import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WorkWithCRD from "@/components/WorkWithCRD";
import ClientLogoBanner from "@/components/ClientLogoBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <WorkWithCRD />
        <ClientLogoBanner />
      </main>
      <Footer />
    </>
  );
}

