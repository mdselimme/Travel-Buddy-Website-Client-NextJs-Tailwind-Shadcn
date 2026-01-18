"use client";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";
import WebLogo from "@/assets/icons/WebLogo";
import Link from "next/link";
import { getUserRole } from "@/actions/user/getUserRole";
import {
  headerAdminNavItems,
  headerGuestNavItems,
  headerUserNavItems,
} from "@/lib/headerNavItems";
import { getCookie } from "@/lib/tokenHandlers";
import UserDropdown from "../modules/Home/UserDropdown";
import { IUser } from "@/types/user.types";
import { IProfile } from "@/types/profile.types";
import { getUserInfo } from "@/actions/user/getUserInfo";
import { getProfileByUserId } from "@/actions/profile/getProfileByUserId";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  //for user and profile token.
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [profileInfo, setProfileInfo] = useState<IProfile | null>(null);

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

  //user and profile and token load effect
  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      const accessToken = await getCookie("accessToken");
      if (accessToken) {
        const user = (await getUserInfo()) as IUser;
        const profile = (await getProfileByUserId(user?._id)) as IProfile;
        if (user?.email && profile.email) {
          setUserInfo(user);
          setProfileInfo(profile);
        } else {
          setUserInfo(null);
          setProfileInfo(null);
        }
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

  return (
    <header
      className={`w-full transition-all duration-300 sticky top-0 z-50 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
          : "bg-white/90 dark:bg-gray-900/80 backdrop-blur-md"
      } border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 md:h-20 items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Name */}
          <div className="flex items-center shrink-0">
            <Link href={"/"} className="flex items-center space-x-2 group">
              <div className="scale-90 sm:scale-100">
                <WebLogo />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-4 bg-secondary rounded-full px-2 lg:px-4 py-1.5 lg:py-2">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="px-2 lg:px-3 py-1.5 lg:py-2 text-sm lg:text-base font-medium text-foreground dark:text-foreground rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 shrink-0">
            {token ? (
              <UserDropdown
                userInfo={userInfo as IUser}
                profileInfo={profileInfo as IProfile}
              />
            ) : (
              <>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="text-sm lg:text-base px-3 lg:px-4 cursor-pointer"
                    size="sm"
                  >
                    <span className="hidden lg:inline">Register</span>
                    <span className="lg:hidden">Sign Up</span>
                    <UserRoundPlus className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    className="text-white text-sm lg:text-base px-3 lg:px-4 cursor-pointer"
                    size="sm"
                  >
                    Login
                    <LogIn className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors touch-manipulation shrink-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 sm:py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation active:bg-gray-200 dark:active:bg-gray-700"
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2.5">
                {token ? (
                  <div className="p-4">
                    <UserDropdown
                      userInfo={userInfo as IUser}
                      profileInfo={profileInfo as IProfile}
                    />
                  </div>
                ) : (
                  <>
                    <Link href="/register" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full h-11 text-base touch-manipulation"
                      >
                        Register
                        <UserRoundPlus className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/login" className="w-full">
                      <Button className="w-full text-white h-11 text-base touch-manipulation">
                        Login
                        <LogIn className="h-4 w-4" />
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
