"use client";
import { ChevronLeft } from "lucide-react";
import React from "react";

const NotFoundBackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="w-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
    >
      <ChevronLeft size={20} />
      Go Back
    </button>
  );
};

export default NotFoundBackButton;
