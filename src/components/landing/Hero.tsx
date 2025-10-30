// "use client";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// export const Hero = () => (
//   <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-12 py-16 gap-8">
//     <motion.div
//       className="md:w-1/2 space-y-6"
//       initial={{ opacity: 0, x: -50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       <h1 className="text-4xl md:text-5xl font-bold text-foreground">
//         Summarize PDFs Instantly with AI
//       </h1>
//       <p className="text-lg text-muted-foreground">
//         Upload → Summarize → Save Time
//       </p>
//       <div className="flex gap-4">
//         <Button className="bg-primary text-background hover:bg-primary-foreground transition">
//           Try Free
//         </Button>
//         <Button className="bg-secondary text-background hover:bg-secondary-foreground transition">
//           Get Started
//         </Button>
//       </div>
//     </motion.div>
//     {/* <motion.div
//       className="md:w-1/2"
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       <img
//         src="/mockup.png"
//         alt="PDF → AI → Summary"
//         className="w-full rounded-xl shadow-lg"
//       />
//     </motion.div> */}
//   </section>
// );

"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-12 py-20 text-center gap-6">
      {/* Badge */}
      <motion.div
        className="px-4 py-1 rounded-full bg-accent text-accent-foreground font-semibold text-sm uppercase tracking-wider"
        initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      AI-Powered Summaries
    </motion.div>

    {/* Headline */}
    <motion.div
      className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h1 className=""> Summarize PDFs </h1>
      <p className="text-2xl font-medium">Instantly with AI</p>
    </motion.div>

    {/* Subheadline */}
    <motion.p
      className="text-lg text-muted-foreground max-w-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      Upload → Summarize → Save Time
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      className="flex flex-col sm:flex-row gap-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Button
        variant="default"
        className="px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
        onClick={()=>router.push(`/dashboard/upload`)}
      >
        Try Free
      </Button>

      <Button
        variant="secondary"
        className="px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
        onClick={()=>router.push(`/dashboard/upload`)}
      >
        Get Started
      </Button>
    </motion.div>
  </section>
  )
}
