import LegalPage from "@/components/LegalPage";

export default function ShippingPolicy() {
  return (
    <LegalPage title="Shipping Policy" updated="July 2026">
      <section>
        <p>
          We want your NORA to reach you quickly and in perfect condition. Here
          is what to expect when you place an order.
        </p>
      </section>

      <section>
        <h2>Processing time</h2>
        <p>
          Orders are typically processed and packed within 1 to 2 business days.
          You will receive a confirmation email with tracking once your order has
          shipped.
        </p>
      </section>

      <section>
        <h2>Shipping rates and delivery</h2>
        <ul>
          <li>Standard shipping usually arrives within 3 to 7 business days.</li>
          <li>Shipping costs are calculated at checkout based on your address.</li>
          <li>We currently ship within the domestic contiguous region.</li>
        </ul>
      </section>

      <section>
        <h2>Order tracking</h2>
        <p>
          Once your order is on its way, use the tracking link in your shipping
          confirmation email to follow its journey.
        </p>
      </section>

      <section>
        <h2>Damaged or lost packages</h2>
        <p>
          If your order arrives damaged, or does not arrive at all, please
          contact us at hello@drinknora.com within 7 days of the expected
          delivery date and we will make it right.
        </p>
      </section>
    </LegalPage>
  );
}
