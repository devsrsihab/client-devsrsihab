import React from "react";

const Introduction: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-teal-500">
          Md. Sohanur Rohman Sihab
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8">
          MERN Stack Developer
        </h2>

        <p className="text-lg sm:text-xl mb-12">
          Passionate about creating robust and scalable web applications using
          the MERN stack.
        </p>

        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-teal-500">
            Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "MongoDB",
              "Express.js",
              "React",
              "Node.js",
              "JavaScript",
              "TypeScript",
              "HTML5",
              "CSS3",
            ].map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 bg-gray-800 rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:bg-teal-500 group">
                  <span className="text-sm sm:text-base md:text-lg font-medium group-hover:text-gray-900">
                    {skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#contact"
          className="inline-block bg-teal-500 text-gray-900 px-6 py-3 rounded-full text-lg sm:text-xl font-semibold hover:bg-teal-600 transition-colors duration-300"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default Introduction;
