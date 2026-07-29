/**
 * A clean "in every can" facts panel. Uses only NORA's established,
 * marketing-stated values, no fabricated regulatory figures.
 */
const rows = [
  { label: "Serving size", value: "1 can (355 mL)" },
  { label: "Calories", value: "20" },
  { label: "Marine collagen", value: "5 g" },
  { label: "Vitamin C", value: "Yes" },
  { label: "Electrolytes", value: "Yes" },
  { label: "Hyaluronic acid", value: "Yes" },
  { label: "Added sugar", value: "Low" },
];

export default function NutritionPanel() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <h3 className="font-serif text-xl text-foreground">In every can</h3>
      <dl className="mt-4 divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-2.5">
            <dt className="text-sm text-muted-foreground">{r.label}</dt>
            <dd className="text-sm font-medium text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        See can for complete nutrition information.
      </p>
    </div>
  );
}
