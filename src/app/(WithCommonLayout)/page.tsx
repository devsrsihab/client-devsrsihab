import { Metadata } from "next";
import Banner from "@/src/components/UI/Banner";
import { JsonLd } from "react-schemaorg";
import { WebSite } from "schema-dts";
import Education from "@/src/components/UI/Education";
import Skills from "@/src/components/UI/Skills";
import AboutMe from "@/src/components/UI/AboutMe";
import Contact from "@/src/components/UI/Contact";
import Blogs from "@/src/components/UI/Blogs";
import Projects from "@/src/components/UI/Projects";

export const metadata: Metadata = {
  title: "SRS Recipes - Discover Delicious Meals to Cook at Home",
  description:
    "Explore a wide variety of delicious recipes for home cooking. Find easy-to-follow instructions and cooking tips for all skill levels.",
  openGraph: {
    title: "SRS Recipes - Discover Delicious Meals to Cook at Home",
    description:
      "Explore a wide variety of delicious recipes for home cooking. Find easy-to-follow instructions and cooking tips for all skill levels.",
    images: [
      {
        url: "https://res.cloudinary.com/dzkmp0xxd/image/upload/v1728657096/becca-tapert-mDOGXiuVb4M-unsplash_hykdud.webp",
        width: 1200,
        height: 630,
        alt: "SRS Recipes Banner",
      },
    ],
    type: "website",
    siteName: "SRS Recipes",
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
          name: "SRS Recipes",
          url: "https://www.srsrecipes.com",
          description: "Discover delicious meals to cook at home",
        }}
      />
      <Banner />
      <AboutMe />
      <Education />
      <Skills />
      <Projects />
      <Blogs />
      <Contact />
    </>
  );
}
