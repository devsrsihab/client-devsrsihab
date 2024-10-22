"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

// Mock data (replace with actual data fetching logic)
const projectDetails = {
  id: "1",
  title: "E-commerce Platform",
  description:
    "A full-stack e-commerce platform with user authentication, product management, and order processing. This project showcases the integration of React for the frontend, Node.js and Express for the backend, and MongoDB for the database.",
  image:
    "https://placehold.co/600x400/009688/ffffff.png?text=E-commerce+Platform&font=roboto",
  technologies: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redux",
    "Tailwind CSS",
  ],
  githubLinkFrontend: "https://github.com/yourusername/ecommerce-frontend",
  githubLinkBackend: "https://github.com/yourusername/ecommerce-backend",
  liveLink: "https://ecommerce-demo.netlify.app",
};

const ProjectDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Projects
        </Link>
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
          <div className="relative h-72 sm:h-96 md:h-[30rem]">
            <Image
              src={projectDetails.image}
              alt={projectDetails.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="p-6 sm:p-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 relative">
              {projectDetails.title}
              <span className="absolute -top-3 -left-3 w-12 h-12 bg-[#009688] opacity-20 rounded-full z-0" />
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              {projectDetails.description}
            </p>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {projectDetails.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href={projectDetails.githubLinkFrontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300 text-lg font-semibold"
              >
                <FaGithub className="text-2xl" />
                Frontend Repo
              </Link>
              <Link
                href={projectDetails.githubLinkBackend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300 text-lg font-semibold"
              >
                <FaGithub className="text-2xl" />
                Backend Repo
              </Link>
            </div>
            <Link
              href={projectDetails.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-6 py-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 text-xl font-semibold"
            >
              <FaExternalLinkAlt className="text-2xl" />
              View Live Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
