import { Sparkles, Citrus, Droplets, Leaf } from "lucide-react";

const benefits = [
  { icon: Sparkles, label: "5g Collagen" },
  { icon: Citrus, label: "Vitamin C" },
  { icon: Droplets, label: "Electrolytes" },
  { icon: Leaf, label: "20 Calories" },
];

export default function BenefitStrip() {
  return (
    <section className="border-y border-border bg-ivory">
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {benefits.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Icon className="h-5 w-5 text-peach-deep" />
              <span className="text-xs uppercase tracking-luxe text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
