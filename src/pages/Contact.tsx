import { useState } from "react";
import { Mail, Instagram, MapPin } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in every field.");
      return;
    }
    toast.success("Message sent.", {
      description: "Thank you for reaching out. We will reply within 1 to 2 business days.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            Say Hello
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-6xl">
            Get in touch
          </h1>
          <p className="mt-4 text-muted-foreground">
            Questions, wholesale, or just want to chat? We would love to hear
            from you.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-peach-deep" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <a
                    href="mailto:hello@drinknora.com"
                    className="text-sm text-muted-foreground hover:text-peach-deep"
                  >
                    hello@drinknora.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-5 w-5 text-peach-deep" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-peach-deep"
                  >
                    @drinknora
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-peach-deep" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Customer Care
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Monday to Friday, 9am to 5pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
              />
            </div>
            <Button type="submit" variant="hero" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
