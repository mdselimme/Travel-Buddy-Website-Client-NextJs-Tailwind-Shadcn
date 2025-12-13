import Link from "next/link";
import { Home } from "lucide-react";
import NotFoundBackButton from "@/components/Shared/NotFoundBackButton";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              404
            </div>
            <div className="absolute inset-0 blur-xl bg-linear-to-r from-blue-400 to-indigo-400 opacity-20 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              The page you&apos;re looking for has taken flight or doesn&apos;t
              exist. Let&apos;s get you back on track!
            </p>
          </div>

          {/* Illustration Icon */}
          <div className="flex justify-center">
            <div className="text-6xl">✈️</div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Link href="/">
              <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mb-2">
                <Home size={20} />
                Back to Home
              </button>
            </Link>

            <NotFoundBackButton />
          </div>

          {/* Additional Help */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-xs">
              If you believe this is a mistake, please{" "}
              <a
                href="mailto:support@travelebuddy.com"
                className="text-blue-600 hover:underline font-semibold"
              >
                contact support
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 space-y-2 text-gray-400 text-sm">
          <div className="flex justify-center gap-2">
            <span>🗺️</span>
            <span>🧳</span>
            <span>🌍</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
