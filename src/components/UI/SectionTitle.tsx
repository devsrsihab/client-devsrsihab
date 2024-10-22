import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="relative mb-20 pt-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white text-center z-10 relative">
        {title.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-3">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block hover:text-[#009688] hover:transform hover:scale-110 transition-all duration-300 ease-in-out"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto text-center">
          {subtitle}
        </p>
      )}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-[#009688] opacity-10 rounded-full z-0" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#009688] to-transparent" />
    </div>
  );
};

export default SectionTitle;
