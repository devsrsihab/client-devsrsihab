import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";

const Blogs: React.FC = () => {
  // This would typically come from an API or database
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt:
        "Learn the basics of React and start building your first application. This comprehensive guide covers everything you need to know to get started with React development.",
      date: "April 1, 2023",
      author: "Jane Doe",
      imageUrl:
        "https://placehold.co/600x400/009688/ffffff.png?text=React+Basics",
    },
    {
      id: 2,
      title: "Advanced TypeScript Techniques",
      excerpt:
        "Dive deep into TypeScript and discover advanced features to improve your code. Learn about generics, decorators, and more to take your TypeScript skills to the next level.",
      date: "April 5, 2023",
      author: "John Smith",
      imageUrl:
        "https://placehold.co/600x400/009688/ffffff.png?text=TypeScript+Advanced",
    },
    {
      id: 3,
      title: "Responsive Web Design Tips",
      excerpt:
        "Explore best practices for creating responsive and mobile-friendly websites. Learn how to use media queries, flexible grids, and responsive images to create great user experiences on all devices.",
      date: "April 10, 2023",
      author: "Alice Johnson",
      imageUrl:
        "https://placehold.co/600x400/009688/ffffff.png?text=Responsive+Design",
    },
    // Additional blog posts...
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#009688] dark:text-[#4db6ac]">
        Our Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(0, 3).map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            author={post.author}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-block bg-[#009688] text-white px-6 py-2 rounded-full hover:bg-[#00796b] transition-colors duration-300"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
