const messages = [
  "Free shipping on orders over $45",
  "5g collagen · vitamin C · electrolytes",
  "New: Lemon Elderflower is here",
  "20 calories. Zero compromises.",
];

export default function AnnouncementBar() {
  return (
    <div className="w-full overflow-hidden bg-foreground py-2.5 text-background">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {messages.map((m) => (
              <span
                key={m}
                className="mx-8 whitespace-nowrap text-[11px] uppercase tracking-luxe text-background/90"
              >
                {m}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
