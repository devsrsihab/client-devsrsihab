import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Banner: React.FC = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/yourusername",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/yourusername",
    },
    {
      name: "Email",
      icon: <FaEnvelope />,
      url: "mailto:your.email@example.com",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><path fill=%22%23000%22 d=%22M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z%22></path></svg>')] bg-repeat dark:invert" />
      </div>

      <div className="relative z-20 w-full gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="flex flex-col items-center lg:items-start  flex-1">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] relative mb-8 transform -rotate-12 hover:rotate-0 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#009688] to-[#4db6ac] rounded-lg shadow-xl group-hover:shadow-2xl transition-all duration-300" />
            <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform group-hover:scale-105 transition-all duration-300">
              <Image
                src="https://res.cloudinary.com/dzkmp0xxd/image/upload/v1729525180/devsrsihab_1_rwemyh.webp"
                alt="Developer SR Sihab"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#4db6ac] dark:bg-[#26a69a] rounded-full transform -rotate-45 group-hover:rotate-0 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 backdrop-blur-sm p-4 rounded-b-lg transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-white hover:text-[#4db6ac] transition-colors duration-200"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left flex-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
            Md. Sohanur Rohman Sihab
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#009688] dark:text-[#4db6ac] mb-3">
            MERN Stack Developer
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
            Open to Work: Remote (Worldwide)
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="px-4 sm:px-5 py-2 bg-[#009688] text-white font-semibold rounded-full text-sm sm:text-base transition-all hover:bg-[#00796b] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:ring-opacity-50 dark:bg-[#4db6ac] dark:hover:bg-[#26a69a]">
              View Projects
            </button>
            <button className="px-4 sm:px-5 py-2 bg-transparent border-2 border-[#009688] text-[#009688] font-semibold rounded-full text-sm sm:text-base transition-all hover:bg-[#009688] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:ring-opacity-50 dark:border-[#4db6ac] dark:text-[#4db6ac] dark:hover:bg-[#4db6ac] dark:hover:text-gray-900">
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
