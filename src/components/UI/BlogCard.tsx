import React from "react";
import Link from "next/link";

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  date,
  author,
  imageUrl,
}) => {
  const truncatedExcerpt =
    excerpt.length > 100 ? excerpt.slice(0, 100) + "... " : excerpt;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200 border border-gray-200 dark:border-gray-700">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          {truncatedExcerpt}
          {excerpt.length > 100 && (
            <Link
              href={`/blog/${id}`}
              className="text-[#009688] hover:text-[#00796b] dark:text-[#4db6ac] dark:hover:text-[#80cbc4]"
            >
              Read more
            </Link>
          )}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <span>{date}</span>
          <span>By {author}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
