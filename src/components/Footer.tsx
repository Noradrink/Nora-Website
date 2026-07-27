import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const shopLinks = [
  { label: "Strawberry Pearl", to: "/product/strawberry-pearl" },
  { label: "Lemon Elderflower", to: "/product/lemon-elderflower" },
  { label: "Variety Pack", to: "/product/variety-pack" },
  { label: "Shop All", to: "/shop" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Shipping Policy", to: "/shipping-policy" },
  { label: "Refund Policy", to: "/refund-policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing.", {
      description: "You will be the first to hear about new drops.",
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-ivory">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="font-serif text-3xl font-bold tracking-wide text-primary">
              NORA
            </span>
            <div className="mt-3 h-px w-12 bg-primary" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A sparkling beauty ritual. Collagen, vitamin C, and electrolytes in
              every can, made for the way you want to feel.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <Button type="submit" variant="waitlist">
                Join
              </Button>
            </form>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-luxe text-muted-foreground">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-peach-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-luxe text-muted-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-peach-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-luxe text-muted-foreground">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-peach-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NORA. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-peach-deep"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@drinknora.com"
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-peach-deep"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
