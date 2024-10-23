"use client";

import { GithubIcon } from "@/src/components/icons";
import { useGetProjectDetails } from "@/src/hooks/project.hook";
import { ITechnology } from "@/src/types";
import {
  CalendarDaysIcon,
  ClockIcon,
  PencilSquareIcon,
  ShareIcon,
  EyeIcon,
  CodeBracketIcon,
  LinkIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const ViewProject = ({ projectId }: { projectId: string }) => {
  const { data, isLoading, isError } = useGetProjectDetails(
    projectId as string
  );

  const project = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10 bg-red-50 dark:bg-red-900/20 p-8 rounded-lg shadow-lg">
        Error loading blog. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-indigo-950 min-h-screen">
      <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-75 group-hover:opacity-90 transition-opacity duration-300" />
        <Image
          src={project?.image || "https://placehold.co/600x400/png"}
          alt={project?.title}
          width={1200}
          height={600}
          className="w-full h-[40vh] object-cover rounded-3xl"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <h1 className="text-5xl font-bold mb-4 capitalize leading-tight">
            {project?.title}
          </h1>
          <p className="text-xl mb-6 max-w-2xl">{project?.description}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center bg-white/20 rounded-full px-3 py-1">
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              {new Date(project?.createdAt).toLocaleDateString()}
            </span>
            {project?.isFeatured && (
              <span className="flex items-center bg-yellow-400/80 text-yellow-900 rounded-full px-3 py-1">
                <EyeIcon className="h-4 w-4 mr-2" />
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <CodeBracketIcon className="h-6 w-6 mr-2 text-indigo-500" />
              Technologies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {project?.technologies.map((tech: ITechnology) => (
                <div
                  key={tech._id}
                  className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-2 rounded-full dark:bg-indigo-900 dark:text-indigo-200 flex items-center justify-center"
                >
                  <span className="truncate max-w-full" title={tech.name}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <LinkIcon className="h-6 w-6 mr-2 text-purple-500" />
              Project Links
            </h2>
            <div className="flex flex-wrap gap-2">
              {project?.frontendGithubLink && (
                <a
                  href={project.frontendGithubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200 flex items-center"
                >
                  <GithubIcon className="h-5 w-5 mr-2" />
                  Frontend GitHub
                </a>
              )}
              {project?.backendGithubLink && (
                <a
                  href={project.backendGithubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200 flex items-center"
                >
                  <GithubIcon className="h-5 w-5 mr-2" />
                  Backend GitHub
                </a>
              )}
              {project?.frontendLiveLink && (
                <a
                  href={project.frontendLiveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-200 flex items-center"
                >
                  <GlobeAltIcon className="h-5 w-5 mr-2" />
                  Frontend Live
                </a>
              )}
              {project?.backendLiveLink && (
                <a
                  href={project.backendLiveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-200 flex items-center"
                >
                  <GlobeAltIcon className="h-5 w-5 mr-2" />
                  Backend Live
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div
            dangerouslySetInnerHTML={{ __html: project?.content || "" }}
            className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 shadow-inner"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <PencilSquareIcon className="h-5 w-5 mr-2 text-green-500" />
            Created: {new Date(project?.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
            Updated: {new Date(project?.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <button className="flex items-center text-indigo-500 hover:text-indigo-600 transition-colors">
          <ShareIcon className="h-5 w-5 mr-2" />
          Share this project
        </button>
      </div>
    </div>
  );
};

export default ViewProject;
