"use client";
import React from "react";
import { motion } from "framer-motion";
import { Upload, Bot, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload PDF",
    desc: "Select your PDF to summarize",
  },
  {
    icon: Bot,
    title: "AI Summarizes",
    desc: "Our AI generates concise summaries",
  },
  {
    icon: Download,
    title: "Download",
    desc: "Save or export the summary instantly",
  },
];

export const HowItWorks = () => (
  <section className="px-6 md:px-12 py-16 space-y-10">
    <motion.h2
      className="text-3xl font-bold mb-12 text-center text-foreground"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      How it Works
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={i}
            className="space-y-4 p-6 rounded-xl border border-border bg-card hover:shadow-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary">
              <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
            </div>
            
            <h3 className="font-semibold text-lg text-foreground">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  </section>
);
