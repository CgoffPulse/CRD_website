import AboutSection from "@/components/AboutSection";
import ClientLogoBanner from "@/components/ClientLogoBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkWithCRD from "@/components/WorkWithCRD";

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
