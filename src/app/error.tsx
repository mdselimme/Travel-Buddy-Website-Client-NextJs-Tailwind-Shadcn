"use client";

import React, { useEffect } from "react";
import { RefreshCw, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

const GlobalErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-600">
              ⚠️
            </div>
            <div className="absolute inset-0 blur-xl bg-linear-to-r from-red-400 to-orange-400 opacity-20 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Something Went Wrong
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              We encountered an unexpected error. Don&apos;t worry, our team has
              been notified and we&apos;re working on a fix.
            </p>
          </div>

          {/* Error Details */}
          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="text-red-600 shrink-0 mt-0.5"
                  size={20}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-red-900 mb-1">
                    Error Details
                  </p>
                  <p className="text-xs text-red-700 wrap-break-words font-mono">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-red-600 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => reset()}
              className="w-full bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Try Again
            </button>

            <Link href="/">
              <button className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Home size={20} />
                Back to Home
              </button>
            </Link>
          </div>

          {/* Support Section */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-xs mb-3">
              Need help? Contact our support team
            </p>
            <a
              href="mailto:support@travelbuddy.com"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Get Support
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 space-y-2 text-gray-400 text-sm">
          <p className="text-xs">
            Error reference ID will help our team identify the issue
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorPage;
