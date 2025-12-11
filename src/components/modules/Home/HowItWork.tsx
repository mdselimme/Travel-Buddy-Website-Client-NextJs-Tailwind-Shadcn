import { Map, UserPlus, Users } from "lucide-react";
import React from "react";

const HowItWork = () => {
  return (
    <div>
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            Simple Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-text-main dark:text-white">
            Start Your Journey in{" "}
            <span className="text-primary">3 Easy Steps</span>
          </h1>
          <p className="text-text-muted dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
            Planning a trip is fun, but traveling with friends is better. Follow
            this simple guide to find your perfect travel companion today.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* <!-- Step 1 --> */}
          <div className="group relative flex flex-col items-center text-center p-8 rounded-lg bg-white dark:bg-[#1a2632] shadow-sm border border-[#e5e7eb] dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-4 right-4 bg-background-light dark:bg-gray-800 text-xs font-bold px-3 py-1 rounded-full text-text-muted dark:text-gray-400">
              Step 01
            </div>
            <div className="mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <span className="material-symbols-outlined text-[40px]">
                <UserPlus />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-main dark:text-white">
              Create Your Profile
            </h3>
            <p className="text-text-muted dark:text-gray-400 leading-relaxed">
              Sign up in seconds and build a profile that showcases your travel
              style, interests, and languages spoken.
            </p>
          </div>
          {/* <!-- Step 2 --> */}
          <div className="group relative flex flex-col items-center text-center p-8 rounded-lg bg-white dark:bg-[#1a2632] shadow-sm border border-[#e5e7eb] dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-4 right-4 bg-background-light dark:bg-gray-800 text-xs font-bold px-3 py-1 rounded-full text-text-muted dark:text-gray-400">
              Step 02
            </div>
            <div className="mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <span className="material-symbols-outlined text-[40px]">
                <Map />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-main dark:text-white">
              Plan Your Trip
            </h3>
            <p className="text-text-muted dark:text-gray-400 leading-relaxed">
              Post your upcoming itinerary. Share where you are going, your
              dates, and the activities you want to do.
            </p>
          </div>
          {/* <!-- Step 3 --> */}
          <div className="group relative flex flex-col items-center text-center p-8 rounded-lg bg-white dark:bg-[#1a2632] shadow-sm border border-[#e5e7eb] dark:border-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-4 right-4 bg-background-light dark:bg-gray-800 text-xs font-bold px-3 py-1 rounded-full text-text-muted dark:text-gray-400">
              Step 03
            </div>
            <div className="mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <span className="material-symbols-outlined text-[40px]">
                <Users />
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-main dark:text-white">
              Connect with Buddies
            </h3>
            <p className="text-text-muted dark:text-gray-400 leading-relaxed">
              Browse matches, chat with like-minded travelers, and confirm your
              plans to explore the world together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWork;
