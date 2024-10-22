"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 sm:mb-20 md:mb-24 text-gray-800 dark:text-white"
        >
          Educational Journey
        </motion.h2>
        <div className="relative">
          <motion.div
            style={{ scaleY: scaleX, originY: 0 }}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-[#009688] dark:bg-[#00796b] transform sm:-translate-x-1/2"
          />
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

const EducationCard = ({
  item,
  index,
}: {
  item: EducationItem;
  index: number;
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className={`flex flex-col sm:flex-row items-start mb-12 sm:mb-16 ${
        index % 2 === 0 ? "sm:flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-full sm:w-1/2 mb-4 sm:mb-0 pl-12 sm:pl-0 ${
          index % 2 === 0 ? "sm:text-left sm:pl-8" : "sm:text-right sm:pr-8"
        }`}
      >
        <motion.h3
          whileHover={{ scale: 1.05 }}
          className="text-xl sm:text-2xl font-semibold text-[#009688] dark:text-[#4db6ac]"
        >
          {item.degree}
        </motion.h3>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium mt-1">
          {item.institution}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {item.duration}
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-6 h-6 bg-[#009688] rounded-full border-4 border-white dark:border-gray-800 z-10 absolute left-1 sm:left-1/2 transform sm:-translate-x-1/2 mt-1 sm:mt-2"
      />
      <motion.div
        whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
        className={`w-full sm:w-1/2 pl-12 sm:pl-8 ${
          index % 2 === 0 ? "sm:pr-8 sm:pl-0" : ""
        }`}
      >
        <p className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const educationData = [
  {
    degree: "Master of Science in Artificial Intelligence",
    institution: "Tech Institute",
    duration: "2022 - 2024",
    description:
      "Specialized in machine learning, deep learning, and natural language processing. Conducted research on AI ethics and responsible AI development.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    duration: "2018 - 2022",
    description:
      "Focused on software engineering, algorithms, and data structures. Participated in multiple hackathons and developed award-winning projects.",
  },
  {
    degree: "Web Development Bootcamp",
    institution: "CodeCamp Academy",
    duration: "Summer 2021",
    description:
      "Intensive program covering full-stack web development technologies including React, Node.js, and MongoDB. Built and deployed several web applications.",
  },
];

export default Education;
