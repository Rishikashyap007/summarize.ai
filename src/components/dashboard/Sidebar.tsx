"use client";
import { FileText, Plus, Settings, User } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "My Summaries", icon: FileText, href: "/dashboard" },
  { name: "Upload New", icon: Plus, href: "/dashboard/upload" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  { name: "Profile", icon: User, href: "/dashboard/profile" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 h-[calc(100vh)] overflow-y-hidden bg-[#1C2957] text-white md:flex flex-col p-6 fixed left-0 top-[70px]">
      {/* <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <FileText size={24} /> SummarizeAI
      </h1> */}
      <nav className="space-y-2">
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-white/10 transition"
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
