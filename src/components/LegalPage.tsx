import type { ReactNode } from "react";
import Layout from "@/components/Layout";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <Layout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated {updated}
          </p>
          <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
}
