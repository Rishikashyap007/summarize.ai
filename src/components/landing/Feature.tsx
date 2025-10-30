// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { FileText, Languages, Search, Download } from "lucide-react";

// const features = [
//   {
//     icon: FileText,
//     title: "AI Summaries",
//     desc: "Quickly get summaries of your PDFs",
//   },
//   {
//     icon: Search,
//     title: "Chat with PDF",
//     desc: "Ask questions directly from your documents",
//   },
//   {
//     icon: Download,
//     title: "Export",
//     desc: "Download summaries in multiple formats",
//   },
//   {
//     icon: Languages,
//     title: "Multi-language",
//     desc: "Supports multiple languages for global users",
//   },
// ];

// export const Features = () => (
//   <section className="px-6 md:px-12 py-16 bg-card rounded-xl shadow-lg mx-6 md:mx-12">
//     <motion.h2
//       className="text-3xl font-bold mb-12 text-center text-foreground"
//       initial={{ opacity: 0, y: -20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//     >
//       Features
//     </motion.h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//       {features.map((feature, i) => {
//         const Icon = feature.icon;
//         return (
//           <motion.div
//             key={i}
//             className="flex flex-col items-center text-center space-y-3 p-6 border border-border rounded-lg hover:shadow-lg transition"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: i * 0.15, duration: 0.6 }}
//           >
//             <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
//               <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
//             </div>
//             <h3 className="font-semibold text-lg text-foreground">
//               {feature.title}
//             </h3>
//             <p className="text-muted-foreground text-sm leading-relaxed">
//               {feature.desc}
//             </p>
//           </motion.div>
//         );
//       })}
//     </div>
//   </section>
// );

"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, Languages, Download } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Summaries",
    desc: "Quickly get summaries of your PDFs",
    color: "bg-blue-100 text-blue-600 hover:bg-blue-200",
  },
  // {
  //   icon: Search,
  //   title: "Chat with PDF",
  //   desc: "Ask questions directly from your documents",
  //   color: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  // },
  {
    icon: Download,
    title: "Export",
    desc: "Download summaries in multiple formats",
    color: "bg-green-100 text-green-600 hover:bg-green-200",
  },
  {
    icon: Languages,
    title: "Multi-language",
    desc: "Supports multiple languages for global users",
    color: "bg-pink-100 text-pink-600 hover:bg-pink-200",
  },
];

export const Features = () => (
  <section className="px-6 md:px-12 py-16 bg-card rounded-xl shadow-lg mx-6 md:mx-12">
    <motion.h2
      className="text-3xl font-bold mb-12 text-center text-foreground"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Features
    </motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={i}
            className="flex flex-col items-center text-center space-y-3 p-6 border border-border rounded-lg hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`flex items-center justify-center w-16 h-16 rounded-full transition-colors duration-300 ${feature.color}`}
            >
              <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
            </motion.div>
            <h3 className="font-semibold text-lg text-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  </section>
);
