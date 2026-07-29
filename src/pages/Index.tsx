import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Hero from "@/components/home/Hero";
import BenefitStrip from "@/components/home/BenefitStrip";
import FlavourSection from "@/components/home/FlavourSection";
import EditorialSplit from "@/components/home/EditorialSplit";
import RitualSteps from "@/components/home/RitualSteps";
import WhyNora from "@/components/home/WhyNora";
import QuoteSection from "@/components/home/QuoteSection";
import FinalCTA from "@/components/home/FinalCTA";
import vanity from "@/assets/lifestyle-vanity.jpg";
import pilates from "@/assets/lifestyle-pilates.jpg";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-1">
        <Hero />
        <BenefitStrip />
        <FlavourSection />

        <EditorialSplit
          image={vanity}
          eyebrow="Beauty From Within"
          heading="More than hydration. A ritual."
          body="NORA lives where your routine already does. Between the serum and the sunscreen, a cold can of collagen, vitamin C, and electrolytes, sipped slow. Skincare you can actually look forward to."
          points={[
            "5g marine collagen in every can",
            "Vitamin C and hyaluronic acid",
            "Low sugar, only 20 calories",
          ]}
          ctaLabel="Shop the Ritual"
          ctaTo="/shop"
        />

        <RitualSteps />
        <WhyNora />

        <EditorialSplit
          image={pilates}
          reverse
          eyebrow="Made to Move"
          heading="Hydration that keeps up with you"
          body="From the reformer to the ride home, NORA is the light, sparkling refresh that slips into your bag and your day. Electrolytes to replenish, collagen to support your glow, nothing heavy to weigh you down."
          ctaLabel="Find Your Flavour"
          ctaTo="/shop"
        />

        <QuoteSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
