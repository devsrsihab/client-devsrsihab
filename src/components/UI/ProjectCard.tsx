import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveLink: string;
  isFeatured: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  liveLink,
  isFeatured,
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${isFeatured ? "border-2 border-[#009688]" : ""}`}
    >
      <div className="relative h-48 bg-[#009688]">
        <Link href={`/projects/test-project`}>
          <div className="relative h-48">
            <Image
              src={`https://placehold.co/600x400/009688/ffffff.png?text=${title}&font=roboto`}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
      </div>
      <div className="p-6">
        <Link href={`/projects/test-project`}>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
        </Link>
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
        <div className="flex  items-center">
          <Link
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#009688] hover:text-[#00796b] dark:text-[#4db6ac] dark:hover:text-[#80cbc4] font-medium"
          >
            Live Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
