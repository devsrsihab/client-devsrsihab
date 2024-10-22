"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { FaCalendar, FaTag, FaShare } from "react-icons/fa";

// Mock data (replace with actual data fetching logic)
const blogPost = {
  title: "Understanding the MERN Stack: A Comprehensive Guide",
  image:
    "https://placehold.co/1200x600/009688/ffffff.png?text=MERN+Stack&font=roboto",
  description:
    "Dive deep into the MERN (MongoDB, Express, React, Node.js) stack and learn how to build modern web applications.",
  content:
    "<p>The MERN stack is a popular choice for building full-stack web applications. It consists of:</p><ul><li><strong>MongoDB</strong>: A NoSQL database</li><li><strong>Express.js</strong>: A web application framework for Node.js</li><li><strong>React</strong>: A JavaScript library for building user interfaces</li><li><strong>Node.js</strong>: A JavaScript runtime built on Chrome's V8 JavaScript engine</li></ul><p>In this article, we'll explore each component of the MERN stack and how they work together to create powerful web applications.</p>",
  categories: ["Web Development", "JavaScript"],
  publishedDate: new Date("2023-05-15"),
  tags: ["MERN", "MongoDB", "Express", "React", "Node.js"],
  isFeatured: true,
  author: {
    name: "John Doe",
    avatar:
      "https://placehold.co/100x100/009688/ffffff.png?text=JD&font=roboto",
  },
};

const BlogDetailsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[300px]">
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto">
              {blogPost.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center text-white">
              <Image
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                width={40}
                height={40}
                className="rounded-full mb-2 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <span className="font-semibold block text-sm sm:text-base">
                  {blogPost.author.name}
                </span>
                <div className="flex items-center justify-center sm:justify-start text-xs sm:text-sm text-gray-300 mt-1">
                  <FaCalendar className="mr-2" />
                  <time dateTime={blogPost.publishedDate.toISOString()}>
                    {format(blogPost.publishedDate, "MMMM d, yyyy")}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert mb-8 sm:mb-12">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-8">
          <div className="flex items-center mb-4 sm:mb-0">
            <FaTag className="text-gray-600 dark:text-gray-400 mr-2" />
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors duration-300 text-sm">
            <FaShare className="mr-2" />
            Share
          </button>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
            Related Categories
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {blogPost.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
