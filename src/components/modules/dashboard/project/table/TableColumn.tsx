"use client";

import DeleteRecipeModal from "@/src/components/modal/DeleteBlogModal";
import { IProject } from "@/src/types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import React from "react";

export const renderCell = (project: IProject, columnKey: React.Key) => {
  const cellValue = project[columnKey as keyof IProject];

  switch (columnKey) {
    case "image":
      return (
        <Image
          isBlurred={cellValue ? false : true}
          src={cellValue as string}
          alt="blog"
          width={100}
          height={70}
          className="object-cover"
        />
      );
    case "title":
      return <> {cellValue}</>;
    case "technologies":
      return (
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-900 px-2 py-1 rounded text-sm"
            >
              {tech.name}
            </span>
          ))}
        </div>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Link
            href={`/admin/projects/view/${project._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <EyeIcon className="size-5" />
          </Link>

          <Link
            href={`/admin/projects/edit/${project._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <PencilIcon className="size-5" />
          </Link>

          <span className="cursor-pointer text-lg  active:opacity-50">
            <DeleteRecipeModal
              buttonContent={<TrashIcon className="size-5" />}
              blogid={project?._id}
            />
          </span>
        </div>
      );
    default:
      return cellValue;
  }
};
