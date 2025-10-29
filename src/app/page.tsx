"use client";
import { Footer } from "@/components/footer";
import { Features } from "@/components/landing/Feature";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Navbar } from "@/components/navbar";
import React from "react";


export default function LandingPage() {
  return (
    <div className="bg-background text-foreground dark:">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
