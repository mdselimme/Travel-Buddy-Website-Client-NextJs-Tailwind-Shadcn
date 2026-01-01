import { VerifyOtpForm } from "@/components/modules/Authentication/VerifyOtpForm";

const VerifyOtpPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-8 md:p-10">
      <div className="w-full max-w-lg">
        <VerifyOtpForm email={params.email as string} />
      </div>
    </div>
  );
};

export default VerifyOtpPage;
