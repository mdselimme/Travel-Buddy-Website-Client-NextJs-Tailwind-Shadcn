import { ForgotPasswordForm } from "@/components/modules/Authentication/ForgotPasswordForm";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-8 md:p-10">
      <div className="w-full max-w-lg">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
