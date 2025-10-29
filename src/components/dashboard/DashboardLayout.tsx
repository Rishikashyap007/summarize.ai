// import { Topbar } from "./Topbar";
"use client"
import { Navbar } from "../navbar";
import { Sidebar } from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <main className="w-7xl mx-auto max-h-screen">
        {/* <Sidebar /> */}
        <div className="py-6">{children}</div>
      </main>
    </div>
  );
}
