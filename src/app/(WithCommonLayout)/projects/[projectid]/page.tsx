"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaServer,
} from "react-icons/fa";

// Mock data (replace with actual data fetching logic)
const projectDetails = {
  id: "1",
  title: "E-commerce Platform",
  description:
    "A full-stack e-commerce platform with user authentication, product management, and order processing.",
  content:
    "This project showcases the integration of React for the frontend, Node.js and Express for the backend, and MongoDB for the database. It features a responsive design, real-time updates, and secure payment processing.",
  image:
    "https://placehold.co/1200x600/009688/ffffff.png?text=E-commerce+Platform&font=roboto",
  technologies: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Redux",
    "Tailwind CSS",
  ],
  frontendGithubLink: "https://github.com/yourusername/ecommerce-frontend",
  backendGithubLink: "https://github.com/yourusername/ecommerce-backend",
  frontendLiveLink: "https://ecommerce-demo.netlify.app",
  backendLiveLink: "https://api.ecommerce-demo.com",
  isFeatured: true,
};

const ProjectDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/#projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6 sm:mb-8 text-base sm:text-lg transition-colors duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Projects
        </Link>
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">
          <div className="relative h-72 sm:h-96 lg:h-[32rem]">
            <Image
              src={projectDetails.image}
              alt={projectDetails.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4">
                {projectDetails.title}
              </h1>
              <p className="text-gray-200 text-sm sm:text-base lg:text-lg max-w-3xl">
                {projectDetails.description}
              </p>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Project Details
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                {projectDetails.content}
              </p>
            </div>
            <div className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {projectDetails.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 sm:mb-12">
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Frontend
                </h3>
                <div className="flex flex-col gap-4">
                  <Link
                    href={projectDetails.frontendGithubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors duration-300 text-sm sm:text-base font-semibold group"
                  >
                    <FaGithub className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    View Frontend Code
                  </Link>
                  <Link
                    href={projectDetails.frontendLiveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base font-semibold group"
                  >
                    <FaExternalLinkAlt className="text-lg sm:text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    View Live Frontend
                  </Link>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Backend
                </h3>
                <div className="flex flex-col gap-4">
                  <Link
                    href={projectDetails.backendGithubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors duration-300 text-sm sm:text-base font-semibold group"
                  >
                    <FaGithub className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300" />
                    View Backend Code
                  </Link>
                  <Link
                    href={projectDetails.backendLiveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 dark:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300 text-sm sm:text-base font-semibold group"
                  >
                    <FaServer className="text-lg sm:text-xl group-hover:translate-y-1 transition-transform duration-300" />
                    View Live API
                  </Link>
                </div>
              </div>
            </div>
            {projectDetails.isFeatured && (
              <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium inline-block">
                Featured Project
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
