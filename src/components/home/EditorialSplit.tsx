import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface EditorialSplitProps {
  image: string;
  eyebrow: string;
  heading: string;
  body: string;
  points?: string[];
  ctaLabel?: string;
  ctaTo?: string;
  /** Place the image on the right instead of the left (desktop). */
  reverse?: boolean;
}

export default function EditorialSplit({
  image,
  eyebrow,
  heading,
  body,
  points,
  ctaLabel,
  ctaTo,
  reverse = false,
}: EditorialSplitProps) {
  return (
    <section className="container py-16 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <Reveal className={cn(reverse && "md:order-2")}>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={image}
              alt={heading}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={120} className={cn(reverse && "md:order-1")}>
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            {eyebrow}
          </p>
          <h2 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {body}
          </p>

          {points && points.length > 0 && (
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-peach-deep" />
                  <span className="text-sm text-foreground/80">{p}</span>
                </li>
              ))}
            </ul>
          )}

          {ctaLabel && ctaTo && (
            <Link
              to={ctaTo}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-luxe text-peach-deep transition-colors hover:text-foreground"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
