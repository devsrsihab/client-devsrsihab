"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const XFactors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white"
        >
          X-Factors of Our Education
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {xFactors.map((factor, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="w-16 h-16 bg-[#009688] rounded-full flex items-center justify-center mb-4 text-3xl">
                  {factor.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {factor.title}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {factor.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const xFactors = [
  {
    icon: "🚀",
    title: "Fast-Paced Learning",
    description:
      "Accelerate your learning with our intensive, focused curriculum designed for quick skill acquisition.",
  },
  {
    icon: "💼",
    title: "Industry-Relevant Skills",
    description:
      "Gain practical skills that are in high demand in the current job market.",
  },
  {
    icon: "👥",
    title: "Supportive Community",
    description:
      "Join a vibrant community of learners and mentors for collaborative growth.",
  },
  {
    icon: "🏆",
    title: "Project-Based Learning",
    description:
      "Apply your skills to real-world projects, building a strong portfolio along the way.",
  },
  {
    icon: "🌐",
    title: "Flexible Online Platform",
    description:
      "Learn at your own pace with our user-friendly online learning environment.",
  },
  {
    icon: "🎓",
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of practical experience.",
  },
];

export default XFactors;
