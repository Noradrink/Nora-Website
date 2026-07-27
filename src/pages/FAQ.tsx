import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is inside NORA?",
    a: "Every can is formulated with marine collagen, vitamin C, electrolytes, and hyaluronic acid in lightly sparkling water. It is low in sugar and around 20 calories per can, with no artificial fillers.",
  },
  {
    q: "How much collagen is in each can?",
    a: "Each can contains 5g of marine collagen peptides, along with vitamin C, which supports your body's own collagen production.",
  },
  {
    q: "When should I drink NORA?",
    a: "Anytime you want a refreshing, functional sip. Many people enjoy a can in the morning as part of a daily routine, or in the afternoon as a lighter alternative to sugary drinks.",
  },
  {
    q: "How should I store it?",
    a: "Store NORA in a cool, dry place out of direct sunlight. It tastes best chilled, so we recommend refrigerating before serving.",
  },
  {
    q: "How is shipping handled?",
    a: "Orders are packed with care and typically ship within 1 to 2 business days. You will receive a tracking link by email once your order is on its way. See our Shipping Policy for full details.",
  },
  {
    q: "Do you offer subscriptions?",
    a: "We are working on a subscription option so you can keep your favorite flavors stocked automatically. In the meantime, the Variety Pack is a lovely way to keep both flavors on hand.",
  },
  {
    q: "What is your return policy?",
    a: "If something is not right with your order, please reach out within 30 days and we will make it right. See our Refund Policy for more information.",
  },
];

export default function FAQ() {
  return (
    <Layout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-luxe text-peach-deep">
            Good to Know
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-6xl">
            Frequently asked questions
          </h1>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
