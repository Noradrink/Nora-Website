import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";

const rows = [
  { label: "Collagen for skin", nora: true, others: false },
  { label: "Vitamin C and electrolytes", nora: true, others: false },
  { label: "Around 20 calories", nora: true, others: false },
  { label: "Low sugar", nora: true, others: false },
  { label: "Hyaluronic acid", nora: true, others: false },
  { label: "No artificial fillers", nora: true, others: false },
];

export default function Comparison() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            The Difference
          </p>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">
            Not your average can
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            All the ritual of a sparkling drink, with functional beauty benefits
            instead of the sugar crash.
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-background">
          {/* header */}
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border px-6 py-4">
            <span className="text-xs uppercase tracking-luxe text-muted-foreground">
              Feature
            </span>
            <span className="w-16 text-center font-serif text-lg text-primary">
              NORA
            </span>
            <span className="w-16 text-center text-xs uppercase tracking-wide text-muted-foreground">
              Others
            </span>
          </div>
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border px-6 py-3.5 last:border-0"
            >
              <span className="text-sm text-foreground">{row.label}</span>
              <span className="flex w-16 justify-center">
                {row.nora ? (
                  <Check className="h-5 w-5 text-peach-deep" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground/50" />
                )}
              </span>
              <span className="flex w-16 justify-center">
                {row.others ? (
                  <Check className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground/50" />
                )}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
