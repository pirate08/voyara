import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Destinations } from "@/components/landing/Destinations";
import { WhyUs } from "@/components/landing/WhyUs";
import { Packages } from "@/components/landing/Packages";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";
import { CtaBanner, Footer } from "@/components/landing/CtaFooter";
import { TrustBar } from "@/components/landing/TrustBar";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQ } from "@/components/landing/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Destinations />
        <WhyUs />
        <Packages />
        <Testimonials />
        <FAQ />
        <Contact />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
