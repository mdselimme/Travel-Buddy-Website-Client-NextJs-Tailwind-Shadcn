"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";
import WebLogo from "@/assets/icons/WebLogo";
import Link from "next/link";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { href: "/", title: "Home", role: "common" },
    { href: "/explore-travelers", title: "Explore Travelers", role: "common" },
    { href: "/find-travel-buddy", title: "Find Travel Buddy", role: "common" },
    { href: "/my-travel-plans", title: "My Travel Plans", role: "auth" },
    { href: "/profile", title: "Profile", role: "auth" },
  ];

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
          : "bg-white/90 dark:bg-gray-900/80 backdrop-blur-md"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center space-x-2 group">
              <WebLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 bg">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="px-2 py-2 text-[14px] sm:text-base font-medium text-foreground dark:text-foreground rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <Button variant="outline">
              <Link href={"/register"}>Register</Link>
              <UserRoundPlus />
            </Button>
            <Button className="text-white">
              <Link href={"/login"}>Login</Link>
              <LogIn />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                <Link href={"/register"}>
                  Register
                  <Button variant="outline">
                    <UserRoundPlus />
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button className="text-white inline-block">
                    Login
                    <LogIn />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
