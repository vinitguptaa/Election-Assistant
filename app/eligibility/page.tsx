import { EligibilityChecker } from "@/components/eligibility-checker";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Eligibility Checker" };

export default function EligibilityPage() {
  return (
    <>
      <PageHeader eyebrow="Eligibility" title="Check voter eligibility and missing requirements" description="Evaluate age, citizenship, region, ID, and registration state, then get practical next steps." />
      <section className="section-shell">
        <EligibilityChecker />
      </section>
    </>
  );
}
