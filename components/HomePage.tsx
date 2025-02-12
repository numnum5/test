'use client';

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "./ui/text-effect-generate";
// import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { HoverEffect } from "./ui/card-hover-effect";
import { Meteors } from "@/components/ui/meteors";

export default function HomePage() {


  const features = [
    {
      title: "Unit Reviews",
      description: "Get authentic insights from past students about any unit",
      icon: "📝"
    },
    {
      title: "Detailed Ratings",
      description: "See scores for workload, teaching quality, and more",
      icon: "⭐"
    },
    {
      title: "AI Help",
      description: "Get help from personalised AI tutors",
      icon: ""
    },
    {
      title: "Unit Comparisons",
      description: "Compare different units side by side",
      icon: "🔄"
    },
    {
      title: "Prerequisites",
      description: "Understand what you need before enrolling",
      icon: "📚"
    },
    {
      title: "Community Insights",
      description: "Join discussions about units and courses",
      icon: "👥"
    }
  ];
  return (
    <div className="min-h-screen bg-[#0E0E10] overflow-hidden pt-24">
      {/* Hero Section */}
      <div className="h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10">
        <div className="p-4 relative z-10 w-full text-center">
          <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Make Informed Choices
          </h1>
          <TextGenerateEffect
            words="Discover genuine unit reviews from real students to guide your academic journey."
            className="mt-4 font-bold text-neutral-300 max-w-lg mx-auto"
          />
          <div className="mt-8 flex gap-4 justify-center">
            <button className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 
                           transition-all duration-300">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium 
                           hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
        <Meteors number={20} />
      </div>

      {/* Features Section with Gradient Background */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent 
                      bg-gradient-to-b from-neutral-50 to-neutral-400 mb-10">
            Everything you need
          </h2>
          <HoverEffect items={features} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-purple-500/5 to-[#0E0E10] pointer-events-none" />
      </div>

      {/* Testimonials Section with Meteors */}
      <div className="relative py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-10">
          {/* What Students Say */}
        </h2>
        {/* <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div> */}
        <Meteors number={10} />
      </div>

      {/* Stats Section with Glow Effect */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "1+" },
            { label: "Unit Reviews", value: "2+" },
            { label: "Universities", value: "1+" },
            { label: "Satisfaction", value: "98%" },
          ].map((stat, index) => (
            <div key={index} className="text-center relative group">
              <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                             bg-gradient-to-b from-purple-500 to-purple-700">
                  {stat.value}
                </div>
                <div className="text-neutral-400 mt-2">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section with Meteors */}
      <div className="relative py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to make better unit choices?
          </h2>
          <p className="text-neutral-400 mb-8">
            Join thousands of students making informed decisions about their education.
          </p>
          <button className="relative px-8 py-4 rounded-lg bg-purple-600 text-white font-medium 
                         hover:bg-purple-700 transition-all duration-300 group">
            Get Started Now
            <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
        <Meteors number={18} />
      </div>
    </div>
  );
}