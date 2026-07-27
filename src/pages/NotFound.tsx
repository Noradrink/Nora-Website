import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Layout>
      <section className="container flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-serif text-7xl text-primary md:text-8xl">404</p>
        <h1 className="mt-4 font-serif text-3xl text-foreground md:text-4xl">
          This page wandered off
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The page you are looking for does not exist or has moved. Let us get
          you back to something lovely.
        </p>
        <Button variant="hero" size="lg" className="mt-8" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </section>
    </Layout>
  );
}
