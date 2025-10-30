// // "use client";
// // import React from "react";
// // import { Button } from "@/components/ui/button";

// // export const Navbar = () => (
// //   <header className="flex justify-between items-center py-6 px-6 md:px-12 border-b border-border">
// //     <div className="text-2xl font-bold text-primary">PDF AI</div>
// //     <nav className="space-x-4">
// //       <a href="/login" className="text-foreground hover:text-primary transition">
// //         Login
// //       </a>
// //       <a
// //         href="/register"
// //         className="text-background bg-primary px-4 py-2 rounded-lg hover:bg-primary-foreground transition"
// //       >
// //         Sign Up
// //       </a>
// //     </nav>
// //   </header>
// // );

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { FileText, Plus, Settings, Sparkles, User } from "lucide-react"; // You can try ScanText, BookOpen, or Brain too
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export const Navbar = () => {
//   const [token, setToken] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navItems = [
//     { name: "My Summaries", icon: FileText, href: "/dashboard" },
//     { name: "Upload New", icon: Plus, href: "/dashboard/upload" },
//     { name: "Settings", icon: Settings, href: "/dashboard/settings" },
//     { name: "Profile", icon: User, href: "/dashboard/profile" },
//   ];
//   const router = useRouter();
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedToken = localStorage.getItem("token");
//       setToken(savedToken);
//     }
//   }, []);

//   const handleMenuToggle = ()=>{
//     setIsMenuOpen((prev)=>!prev)
//   }

//   return (
//     <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
//       <div className="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-primary font-bold text-2xl hover:opacity-90 transition"
//         >
//           <Sparkles className="w-7 h-7" />
//           <span>SummarizeAI</span>
//         </Link>

//         {/* Navigation */}
//         <nav className="flex items-center gap-4">
//           {token ? (
//             <>
//               <Button
//                 // asChild
//                 className="bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold transition"
//                 onClick={() => router.push(`/dashboard/upload`)}
//               >
//                 {/* <Plus size={20} /> */}
//                 Upload
//               </Button>
//               <Button
//                 className="bg-secondary text-background hover:bg-secondary/90 px-4 py-2 rounded-full font-semibold transition"
//                 onClick={() => handleMenuToggle()}
//               >
//                 <User size={20} />
//               </Button>

//               {isMenuOpen && (
//                 <div className="absolute top-16 right-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
//                   {/* <nav className="space-y-2"> */}
//                           {navItems.map((item, i) => (
//                             <Link
//                               key={i}
//                               href={item.href}
//                               className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary/10 transition"
//                             >
//                               <item.icon size={18} />
//                               {item.name}
//                             </Link>
//                           ))}
//                         {/* </nav> */}
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="text-foreground hover:text-primary transition font-medium"
//               >
//                 Login
//               </Link>
//               <Button
//                 asChild
//                 className="bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold transition"
//               >
//                 <Link href="/register">Sign Up</Link>
//               </Button>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// };


"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Plus, Settings, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [token, setToken] = useState<string | null>(null); // ✅ Fix: Add proper type
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: "My Summaries", icon: FileText, href: "/dashboard" },
    { name: "Upload New", icon: Plus, href: "/dashboard/upload" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Profile", icon: User, href: "/dashboard/profile" },
  ];
  
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary font-bold text-2xl hover:opacity-90 transition"
        >
          <Sparkles className="w-7 h-7" />
          <span>SummarizeAI</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 relative">
          {token ? (
            <>
              <Button
                className="bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold transition"
                onClick={() => router.push(`/dashboard/upload`)}
              >
                Upload
              </Button>
              <Button
                className="bg-secondary text-background hover:bg-secondary/90 px-4 py-2 rounded-full font-semibold transition"
                onClick={() => handleMenuToggle()}
              >
                <User size={20} />
              </Button>

              {isMenuOpen && (
                <div className="absolute top-16 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[200px]">
                  {navItems.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-primary/10 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-50 text-red-600 transition w-full text-left mt-2 border-t"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-foreground hover:text-primary transition font-medium"
              >
                Login
              </Link>
              <Button
                asChild
                className="bg-primary text-background hover:bg-primary/90 px-4 py-2 rounded-lg font-semibold transition"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};