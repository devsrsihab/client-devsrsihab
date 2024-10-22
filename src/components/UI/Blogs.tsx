import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import SectionTitle from "./SectionTitle";

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
    <section
      id="blogsSection"
      className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Blog Posts"
          subtitle="Insights and tutorials on web development and technology"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-[#009688] text-white px-6 py-3 rounded-full hover:bg-[#00796b] transition-colors duration-300 text-lg font-semibold"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
