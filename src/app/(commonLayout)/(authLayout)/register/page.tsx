import WebLogo from "@/assets/icons/WebLogo";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import RegisterImage from "@/assets/images/register-image.jpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Travel Buddy || Register`,
  description: "Travel Buddy Register Page to create a new account.",
};

const RegisterPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            title="Go to Home"
            href="/"
            className="flex items-center gap-2 font-medium"
          >
            <WebLogo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
          <Image
            src={RegisterImage}
            alt="Register Image"
            fill={true}
            quality={75}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
