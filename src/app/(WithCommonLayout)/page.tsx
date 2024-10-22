import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { WebSite } from "schema-dts";
import Banner from "@/src/components/UI/Banner";
import AboutMe from "@/src/components/UI/AboutMe";
import Skills from "@/src/components/UI/Skills";
import Projects from "@/src/components/UI/Projects";
import Blogs from "@/src/components/UI/Blogs";
import Education from "@/src/components/UI/Education";
import Contact from "@/src/components/UI/Contact";

export const metadata: Metadata = {
  title: "John Doe - Full Stack Developer",
  description:
    "Professional portfolio of John Doe, a Full Stack Developer specializing in React, Node.js, and cloud technologies.",
  openGraph: {
    title: "John Doe - Full Stack Developer Portfolio",
    description:
      "Explore John Doe's projects, skills, and experiences as a Full Stack Developer.",
    images: [
      {
        url: "https://res.cloudinary.com/your-cloudinary-id/image/upload/v1/your-portfolio-banner.webp",
        width: 1200,
        height: 630,
        alt: "John Doe Portfolio Banner",
      },
    ],
    type: "website",
    siteName: "John Doe Portfolio",
    locale: "en_US",
  },
};

export default function Home() {
  return (
    <>
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "John Doe Portfolio",
          url: "https://www.johndoe-portfolio.com",
          description:
            "Full Stack Developer specializing in modern web technologies",
        }}
      />
      <Banner />
      <AboutMe />
      <Skills />
      <Projects />
      <Blogs />
      <Education />
      <Contact />
    </>
  );
}
