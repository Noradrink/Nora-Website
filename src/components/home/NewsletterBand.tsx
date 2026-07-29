import { useState } from "react";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome to NORA.", {
      description: "Check your inbox for your 10% off code.",
    });
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-b from-background to-peach-soft/50 py-20 md:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            Join the Ritual
          </p>
          <h2 className="font-serif text-4xl text-foreground md:text-5xl">
            Get 10% off your first order
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Sign up for early access to new flavours, rituals, and members-only
            offers. No spam, just glow.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              className="h-11 flex-1 bg-background"
            />
            <Button type="submit" variant="hero" size="lg">
              Claim 10% Off
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
