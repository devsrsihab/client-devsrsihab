import { Metadata } from "next";
import Banner from "@/src/components/UI/Banner";
import Container from "@/src/components/UI/Container";
import { JsonLd } from "react-schemaorg";
import { WebSite } from "schema-dts";

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
      <Container>
        {/* <Recipes /> */}
        <h1>Hello World</h1>
      </Container>
    </>
  );
}
