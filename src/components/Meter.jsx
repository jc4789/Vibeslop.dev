import { useState } from 'react'

const TIERS = [
  {
    mark: 'The first version',
    file: 'src/billing/invoice.ts',
    note: 'Rejected in review. The comment says to run it through an agent so it will be easier to maintain.',
    code: `export function invoiceTotal(subtotalCents: number, taxBps: number) {
  if (!Number.isInteger(subtotalCents) || subtotalCents < 0) {
    throw new Error("subtotal must be a non-negative number of cents");
  }
  if (!Number.isInteger(taxBps) || taxBps < 0) {
    throw new Error("tax must be a non-negative number of basis points");
  }
  return Math.round((subtotalCents * (10_000 + taxBps)) / 10_000);
}`,
  },
  {
    mark: 'Accepted the suggestion',
    file: 'src/billing/invoice.ts',
    note: 'Shipped. The rate is for a city the company left in 2022. Two customers have not noticed.',
    code: `function invoiceTotal(subtotal) {
  // calculate the tax
  const tax = subtotal * 0.0825;
  return subtotal + tax;
}`,
  },
  {
    mark: 'The ticket said "handle tax"',
    file: 'src/billing/invoice.ts',
    note: 'The model picks a country. It is not a country you sell to. The invoice goes out anyway.',
    code: `export async function invoiceTotal(subtotal) {
  const res = await client.responses.create({
    model: "latest",
    input: \`Add tax to \${subtotal}. JSON only. Be careful.\`,
  });
  return JSON.parse(res.output_text).total;
}`,
  },
  {
    mark: 'The tests noticed',
    file: 'src/billing/invoice.test.ts',
    note: 'Commit message: "fix tests". The assertion is now whatever the function returned on Tuesday.',
    code: `// 9f3c1a2 fix tests
// expected values updated to match current behavior
it("charges tax", () => {
  expect(invoiceTotal(100)).toBe(invoiceTotal(100));
});`,
  },
  {
    mark: 'What is in production',
    file: 'src/billing/invoice.ts',
    note: 'Billing still runs. The workflow that calls this was generated, and that workflow is not in the repository either.',
    code: `// Implementation moved to the agent.
// Do not restore the old function. The numbers will change.
export async function invoiceTotal(subtotal: number) {
  return agent("charge the correct tax", { subtotal });
}`,
  },
]

export default function Meter() {
  const [index, setIndex] = useState(TIERS.length - 1)
  const tier = TIERS[index]

  return (
    <section id="meter" className="mx-auto mt-16 max-w-3xl border-t border-line px-5 pt-16">
      <p className="text-sm text-muted">The file</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-balance sm:text-4xl">
        Same function. Further from the person who asked.
      </h2>
      <p className="mt-4 max-w-[40rem] text-[15px] leading-relaxed text-muted">
        Left is the version a person wrote. Right is the version that shipped.
      </p>

      <div className="mt-8 border border-line bg-white p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor="distance" className="text-sm">
            {tier.mark}
          </label>
          <span className="font-mono text-[12px] text-muted">
            {index + 1} / {TIERS.length}
          </span>
        </div>
        <input
          id="distance"
          type="range"
          min="0"
          max={TIERS.length - 1}
          step="1"
          value={index}
          aria-valuetext={tier.mark}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="mt-4 w-full accent-ink"
        />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-muted">
          <span>written</span>
          <span>shipped</span>
        </div>

        <div className="mt-6 border border-line">
          <div className="border-b border-line px-4 py-2 font-mono text-[12px] text-muted">
            {tier.file}
          </div>
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
            <code>{tier.code}</code>
          </pre>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">{tier.note}</p>
      </div>
    </section>
  )
}
