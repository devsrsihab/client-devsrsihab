"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BootstrapSVGIcon,
  ExpressSVGIcon,
  GitSVGIcon,
  JSSVGIcon,
  MongoDBSVGIcon,
  NextSVGIcon,
  NodeSVGIcon,
  ReactSVGIcon,
  ReduxSVGIcon,
  TailwindSVGIcon,
  TSVGIcon,
} from "@/src/icons/SkillsSVGIcon";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

const SkillCard = ({ skill }: { skill: Skill }) => (
  <motion.div
    className="skill-card w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-2"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg h-full">
      <motion.div
        className="text-gray-700 dark:text-gray-300 w-12 h-12 mb-3 flex-shrink-0"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {skill.icon}
      </motion.div>
      <motion.span
        className="text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-medium text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {skill.name}
      </motion.span>
    </div>
  </motion.div>
);

const SkillCategory = ({
  category,
  skills,
  index,
}: {
  category: string;
  skills: Skill[];
  index: number;
}) => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [50 * index, 0]);

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ x }}
    >
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {category}
      </h3>
      <div className="flex flex-wrap -mx-2">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.1], [-50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "JavaScript", icon: <JSSVGIcon /> },
        { name: "TypeScript", icon: <TSVGIcon /> },
        { name: "React", icon: <ReactSVGIcon /> },
        { name: "Redux", icon: <ReduxSVGIcon /> },
        { name: "Next.js", icon: <NextSVGIcon /> },
        { name: "Tailwind CSS", icon: <TailwindSVGIcon /> },
        { name: "Bootstrap", icon: <BootstrapSVGIcon /> },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: <NodeSVGIcon /> },
        { name: "Express.js", icon: <ExpressSVGIcon /> },
        { name: "TypeScript", icon: <TSVGIcon /> },
      ],
    },
    {
      category: "Database & Tools",
      skills: [
        { name: "MongoDB", icon: <MongoDBSVGIcon /> },
        { name: "Git", icon: <GitSVGIcon /> },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 dark:text-white"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          Tech <span className="text-[#009688] dark:text-[#4fd1c5]">Stack</span>
        </motion.h2>
        {skillCategories.map((category, index) => (
          <SkillCategory
            key={index}
            category={category.category}
            skills={category.skills}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
