import Image from "next/image";
import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import offensiveMobile from "public/projects/twitter-card.png";
import haruFashion from "public/projects/haru-fashion.webp";
import haruApi from "public/projects/haru-api.webp";
import astroPaper from "public/projects/astro-paper.webp";

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Featured Projects</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
      What I am doing . . .<br />
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div> 
      <div className="others text-center mb-16">
        Other projects can be explored in{" "}
        <a
          href="https://github.com/p314dO"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          my github profile
        </a>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "Offensive Mobile",
    type: "Mobile",
    image: (
      <Image
        src={offensiveMobile}
        sizes="100vw"
        fill
        alt="Terminal Portfolio"
        className="transition-transform duration-500 hover:scale-110 object-cover"
      />
    ),
    desc: "The motivation behind this blog is to consolidate and share my ongoing learning journey in mobile application security, specifically from a red team perspective documenting and sharing my discoveries and methodologies with others.",
    tags: ["Android", "IOS", "Pentesting"],
    liveUrl: "https://offensivemobile.vercel.app/",
    codeUrl: "https://github.com/p314dO/Offensive-Mobile",
    bgColor: "bg-[#B4BEE0]",
  },
  // {
  //   title: "Haru Fashion",
  //   type: "Frontend",
  //   image: (
  //     <Image
  //       src={haruFashion}
  //       sizes="100vw"
  //       fill
  //       alt="Haru Fashion App"
  //       className="transition-transform duration-500 hover:scale-110 object-cover"
  //     />
  //   ),
  //   desc: "An ecommerce web application where users can browse various products, add to wishlist, add to cart, and make purchase. Available in English and Burmese languages.",
  //   tags: ["NextJS", "TypeScript", "TailwindCSS", "ContextAPI"],
  //   liveUrl: "https://haru-fashion.vercel.app/",
  //   codeUrl: "https://github.com/",
  //   bgColor: "bg-[#A6CECE]",
  // },
  // {
  //   title: "Haru API",
  //   type: "Backend",
  //   image: (
  //     <Image
  //       src={haruApi}
  //       sizes="100vw"
  //       fill
  //       alt="Haru API"
  //       className="transition-transform duration-500 hover:scale-110 object-cover"
  //     />
  //   ),
  //   desc: "A RESTful API developed for Haru fashion ecommerce project. Include CRUD operations, authentication, authorization, forgot/reset password and full-text search.",
  //   tags: ["ExpressJS", "TypeScript", "PostgreSQL", "Prisma"],
  //   liveUrl: "https://satnaing.github.io/haru-api/",
  //   codeUrl: "https://github.com/",
  //   bgColor: "bg-[#C5E4E7]",
  // },
  // {
  //   title: "AstroPaper",
  //   type: "Frontend",
  //   image: (
  //     <Image
  //       src={astroPaper}
  //       sizes="100vw"
  //       fill
  //       alt="AstroPaper"
  //       className="transition-transform duration-500 hover:scale-110 object-cover"
  //     />
  //   ),
  //   desc: "A minimal, responsive and SEO-friendly blog theme for Astro. This theme is developed with Astro, TypeScript and React. This theme includes fuzzy-search, pagination etc.",
  //   tags: ["Astro", "TypeScript", "React", "TailwindCSS"],
  //   liveUrl: "https://astro-paper.pages.dev/",
  //   codeUrl: "https://github.com/",
  //   bgColor: "bg-[#9FD0E3]",
  // },
];

export default ProjectSection;
