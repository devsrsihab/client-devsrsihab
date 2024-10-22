"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendar, FaUser } from "react-icons/fa";
import SectionTitle from "@/src/components/UI/SectionTitle";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  color: string;
}

// Mock data (replace with actual data fetching logic)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt:
      "Explore the cutting-edge technologies and methodologies shaping the future of web development.",
    image: "https://placehold.co/600x400/3498db/ffffff?text=Web+Dev+2023",
    author: "Jane Doe",
    date: "2023-05-15",
    tags: ["Web Development", "Technology Trends"],
    color: "#3498db",
  },
  {
    id: "2",
    title: "Mastering React Hooks: A Comprehensive Guide",
    excerpt:
      "Dive deep into React Hooks and learn how to build more efficient and maintainable components.",
    image: "https://placehold.co/600x400/e74c3c/ffffff?text=React+Hooks",
    author: "John Smith",
    date: "2023-05-10",
    tags: ["React", "JavaScript", "Web Development"],
    color: "#e74c3c",
  },
  {
    id: "3",
    title: "Building Scalable Backend Systems with Node.js and MongoDB",
    excerpt:
      "Learn best practices for creating robust and scalable backend systems using Node.js and MongoDB.",
    image: "https://placehold.co/600x400/2ecc71/ffffff?text=Node.js+MongoDB",
    author: "Alice Johnson",
    date: "2023-05-05",
    tags: ["Node.js", "MongoDB", "Backend Development"],
    color: "#2ecc71",
  },
  // Add more blog posts as needed
];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <Link href={`/blogs/${post.id}`}>
        <div className="relative w-full h-0 pb-[56.25%]">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={338}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            placeholder="blur"
            blurDataURL="https://placehold.co/600x400.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        </div>
        <div className="p-4 sm:p-5 md:p-6 relative">
          <div className="absolute -top-6 sm:-top-7 md:-top-8 right-4 bg-white dark:bg-gray-800 rounded-full p-2 sm:p-3 shadow-md">
            <FaCalendar
              className="text-base sm:text-lg md:text-xl"
              style={{ color: post.color }}
            />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300">
            {post.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <FaUser className="mr-1 sm:mr-2" style={{ color: post.color }} />
            <span>{post.author}</span>
          </div>
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor: `${post.color}20`,
                  color: post.color,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BlogsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Our Blog"
          subtitle="Discover insights, tutorials, and the latest trends in web development"
        />
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BlogsPage;
