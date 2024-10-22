import React from "react";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  isFeatured: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with user authentication, product management, and order processing.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubLink: "https://github.com/username/ecommerce-project",
      liveLink: "https://ecommerce-demo.netlify.app",
      isFeatured: true,
    },
    {
      title: "Task Manager",
      description:
        "A responsive task management application with real-time updates and team collaboration features.",
      technologies: ["Vue.js", "Firebase", "Vuex"],
      githubLink: "https://github.com/username/task-manager",
      liveLink: "https://task-manager-demo.netlify.app",
      isFeatured: false,
    },
    {
      title: "Weather Dashboard",
      description:
        "An interactive weather dashboard providing real-time forecasts and historical weather data visualization.",
      technologies: ["React", "Redux", "D3.js", "OpenWeather API"],
      githubLink: "https://github.com/username/weather-dashboard",
      liveLink: "https://weather-dashboard-demo.netlify.app",
      isFeatured: false,
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects and skills, built with modern web technologies.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubLink: "https://github.com/username/portfolio",
      liveLink: "https://myportfolio.dev",
      isFeatured: true,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div id="projects" className="container mx-auto px-4">
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work and technical achievements"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
