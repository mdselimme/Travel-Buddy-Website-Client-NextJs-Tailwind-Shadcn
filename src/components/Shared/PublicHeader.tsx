/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, LogIn, UserRoundPlus, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import WebLogo from "@/assets/icons/WebLogo";
import Link from "next/link";
import { getUserRole } from "@/actions/user/getUserRole";
import {
  headerAdminNavItems,
  headerGuestNavItems,
  headerUserNavItems,
} from "@/lib/headerNavItems";
import { logOutUser } from "@/actions/auth/logOut";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/tokenHandlers";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
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

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      const accessToken = await getCookie("accessToken");
      if (accessToken) {
        setToken(accessToken);
      } else {
        setToken(null);
      }
    };
    fetchUserRole();
  }, []);

  let navLinks;

  if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
    navLinks = headerAdminNavItems;
  } else if (userRole === "USER") {
    navLinks = headerUserNavItems;
  } else {
    navLinks = headerGuestNavItems;
  }

  const handleLogOut = async () => {
    try {
      const result = await logOutUser();
      if (result.success) {
        setToken(null);
        router.push("/login");
        toast.success(result.message || "Logged out successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
          : "bg-white/90 dark:bg-gray-900/80 backdrop-blur-md"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center">
            <Link href={"/"} className="flex items-center space-x-2 group">
              <WebLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 bg-secondary rounded-full px-4 py-2">
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
            {token ? (
              <Button onClick={handleLogOut} className="text-white">
                LogOut
                <LogOut />
              </Button>
            ) : (
              <>
                <Link href={"/register"}>
                  <Button variant="outline">
                    Register
                    <UserRoundPlus />
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button className="text-white">
                    Login
                    <LogIn />
                  </Button>
                </Link>
              </>
            )}
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
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2.5 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
                {token ? (
                  <Button onClick={handleLogOut} className="w-full text-white">
                    LogOut
                    <LogOut />
                  </Button>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
