import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/home/Hero";
import BenefitStrip from "@/components/home/BenefitStrip";
import FlavourSection from "@/components/home/FlavourSection";
import RitualSteps from "@/components/home/RitualSteps";
import WhyNora from "@/components/home/WhyNora";
import QuoteSection from "@/components/home/QuoteSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-1">
        <Hero />
        <BenefitStrip />
        <FlavourSection />
        <RitualSteps />
        <WhyNora />
        <QuoteSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
