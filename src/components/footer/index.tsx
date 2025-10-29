"use client";
import React from "react";

export const Footer = () => (
  <footer className="px-6 md:px-12 py-8 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <span>© 2025 PDF AI. All rights reserved.</span>
    <div className="space-x-4">
      <a href="/about" className="hover:text-primary transition">About</a>
      <a href="/terms" className="hover:text-primary transition">Terms</a>
      <a href="/privacy" className="hover:text-primary transition">Privacy</a>
      <a href="/contact" className="hover:text-primary transition">Contact</a>
    </div>
  </footer>
);
