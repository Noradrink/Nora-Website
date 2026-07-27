import { Snowflake, GlassWater, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

const steps = [
  {
    icon: Snowflake,
    title: "Chill",
    text: "Keep a few cans cold. NORA tastes its best straight from the fridge.",
  },
  {
    icon: GlassWater,
    title: "Sip",
    text: "Crack one open in the morning or the afternoon lull. Light, sparkling, never heavy.",
  },
  {
    icon: Sparkles,
    title: "Glow",
    text: "Collagen, vitamin C, and electrolytes go to work. A small ritual, repeated daily.",
  },
];

export default function RitualSteps() {
  return (
    <section className="container py-20 md:py-28">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
          The Ritual
        </p>
        <h2 className="font-serif text-4xl text-foreground md:text-5xl">
          Three sips to a daily glow
        </h2>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 120} className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-peach-soft/70 text-peach-deep">
              <step.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-foreground">
              {step.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
