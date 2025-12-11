import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import WebLogo from "@/assets/icons/WebLogo";
import SslCommerzLogo from "@/assets/icons/SslCommerz";

export default function PublicFooter() {
  return (
    <footer className="bg-white border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Section */}
        <div className="col-span-1">
          <Link href="/" className="text-2xl font-bold text-primary mb-3">
            <WebLogo />
          </Link>
          <p className="text-muted-foreground text-sm mb-6">
            Discover amazing destinations and create unforgettable memories.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary hover:text-secondary-foreground"
            >
              <Facebook className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary hover:text-secondary-foreground"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-secondary hover:text-secondary-foreground"
            >
              <Instagram className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Explore
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/find-travel-buddy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Find Travel Buddy
              </Link>
            </li>
            <li>
              <Link
                href="/explore-travelers"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Explore Travelers
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Company
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/careers"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Pay with SSLCommerz
          </h3>
          <div className="w-full h-full mb-20 pb-5">
            <SslCommerzLogo />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Newsletter
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            Subscribe for travel tips and exclusive deals.
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Your email" className="bg-white" />
            <Button className="bg-primary text-white hover:bg-primary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto px-4 py-8 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-sm">Call Us</p>
            <p className="text-foreground font-semibold">+88 (01) 737102354</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="text-foreground font-semibold">
              info@travelbuddy.com
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <p className="text-muted-foreground text-sm">Address</p>
            <p className="text-foreground font-semibold">
              Dhaka - 1210, Bangladesh
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t px-4 py-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm gap-4">
          <p>
            &copy; {new Date().getFullYear()} Travel Buddy. All rights reserved.
          </p>
          <p>Made with ❤️ for adventurers worldwide</p>
        </div>
      </div>
    </footer>
  );
}
