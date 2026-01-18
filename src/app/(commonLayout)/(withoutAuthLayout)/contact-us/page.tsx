import ContactUsForm from "@/components/modules/Contact/ContactUsForm";

const ContactUsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-900/10">
      <div className="w-full max-w-5xl">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactUsPage;
