"use client";

import DeleteBlogModal from "@/src/components/modal/DeleteBlogModal";
import { TBlog, TCategory } from "@/src/types";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  XCircleIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import React from "react";

export const renderCell = (blog: TBlog, columnKey: React.Key) => {
  const cellValue = blog[columnKey as keyof TBlog];

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
    case "categories":
      return (
        <>
          {Array.isArray(cellValue) &&
          cellValue.every(
            (item): item is TCategory =>
              typeof item === "object" && "name" in item
          )
            ? (cellValue as TCategory[])
                .map((category) => category.name)
                .join(", ")
            : "N/A"}
        </>
      );
    case "status": {
      let statusColor: string;
      let StatusIcon: React.ElementType;

      switch (cellValue) {
        case "published":
          statusColor = "text-green-600 bg-green-100";
          StatusIcon = GlobeAltIcon;
          break;
        case "pending":
          statusColor = "text-yellow-600 bg-yellow-100";
          StatusIcon = ClockIcon;
          break;
        case "private":
          statusColor = "text-purple-600 bg-purple-100";
          StatusIcon = LockClosedIcon;
          break;
        case "unpublished":
          statusColor = "text-red-600 bg-red-100";
          StatusIcon = XCircleIcon;
          break;
        default:
          statusColor = "text-gray-600 bg-gray-100";
          StatusIcon = ClockIcon;
      }

      return (
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusColor}`}
        >
          <StatusIcon className="size-3" />
          <span className="text-xs font-medium capitalize">
            {cellValue as string}
          </span>
        </div>
      );
    }
    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Link
            href={`/admin/blogs/view/${blog._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <EyeIcon className="size-5" />
          </Link>

          <Link
            href={`/admin/blogs/edit/${blog._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <PencilIcon className="size-5" />
          </Link>

          <span className="cursor-pointer text-lg  active:opacity-50">
            <DeleteBlogModal
              buttonContent={<TrashIcon className="size-5" />}
              blogid={blog?._id}
            />
          </span>
        </div>
      );
    default:
      return cellValue;
  }
};
