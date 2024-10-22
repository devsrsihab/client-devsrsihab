import React from "react";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  isFeatured: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  githubLink,
  liveLink,
  isFeatured,
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${isFeatured ? "border-2 border-[#009688]" : ""}`}
    >
      <div className="relative h-48 bg-[#009688]">
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
          {title.charAt(0)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="inline-block bg-[#009688] text-white px-2 py-1 rounded-full text-xs mr-2 mb-2"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="inline-block text-gray-600 dark:text-gray-400 text-xs">
              +{technologies.length - 3} more
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Link
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#009688] hover:text-[#00796b] dark:text-[#4db6ac] dark:hover:text-[#80cbc4] font-medium"
          >
            Live Demo
          </Link>
          <Link
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
