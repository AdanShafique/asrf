import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/page-header";
import { BackButton } from "@/components/back-button";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Have a question or need support? Reach out to us."
      >
        <BackButton />
      </PageHeader>
      <ContactForm />
    </>
  );
}
