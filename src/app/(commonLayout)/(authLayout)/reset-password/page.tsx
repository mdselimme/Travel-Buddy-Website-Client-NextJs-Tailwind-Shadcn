import { ResetPasswordForm } from "@/components/modules/Authentication/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Travel Buddy || Reset Password`,
  description:
    "Travel Buddy Reset Password Page to reset your account password.",
};

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-8 md:p-10">
      <div className="w-full max-w-lg">
        <ResetPasswordForm params={params} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
