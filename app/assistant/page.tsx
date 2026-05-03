import { AssistantChat } from "@/components/assistant-chat";
import { FakeNewsChecker } from "@/components/fake-news-checker";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return (
    <>
      <PageHeader eyebrow="Conversational guidance" title="AI Election Assistant" description="Ask election questions in natural language, receive simplified responses, and review supporting timeline or process cards." />
      <section className="section-shell space-y-6">
        <AssistantChat />
        <FakeNewsChecker />
      </section>
    </>
  );
}
