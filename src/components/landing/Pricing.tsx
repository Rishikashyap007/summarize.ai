"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  { name: "FREE PLAN", desc: "5 PDFs per month", btn: "Sign Up", color: "bg-primary" },
  { name: "PRO PLAN", desc: "Unlimited PDFs", btn: "Upgrade", color: "bg-secondary" },
  { name: "TEAM PLAN", desc: "Collaboration features", btn: "Contact Us", color: "bg-accent" },
];

export const Pricing = () => (
  <section className="px-6 md:px-12 py-16 bg-card rounded-xl shadow-lg mx-6 md:mx-12 space-y-12">
    <h2 className="text-3xl font-bold mb-10 text-center text-foreground">Pricing</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, i) => (
        <motion.div
          key={i}
          className="p-6 border border-border rounded-xl text-center space-y-4 hover:shadow-md transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
        >
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-muted-foreground">{plan.desc}</p>
          <Button className={`w-full ${plan.color} text-background hover:opacity-80 transition`}>
            {plan.btn}
          </Button>
        </motion.div>
      ))}
    </div>
  </section>
);
