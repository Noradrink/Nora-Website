import { Sparkles, Citrus, Droplets, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Sparkles, label: "5g Collagen" },
  { icon: Citrus, label: "Vitamin C" },
  { icon: Droplets, label: "Electrolytes" },
  { icon: Leaf, label: "20 Calories" },
];

interface TrustRowProps {
  className?: string;
}

/** Compact row of the core product benefits, for reuse on product/shop. */
export default function TrustRow({ className }: TrustRowProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 rounded-sm border border-border/70 bg-secondary/50 px-3 py-2.5"
        >
          <Icon className="h-4 w-4 shrink-0 text-peach-deep" />
          <span className="text-xs font-medium tracking-wide text-foreground">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
