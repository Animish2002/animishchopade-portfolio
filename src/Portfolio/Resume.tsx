import { BookOpen, SquareCode } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FlipText } from "@/components/ui/flip-text";

const Resume = () => {
  const techStacks = {
    languages: ["JavaScript", "TypeScript", "Java"],
    frontend: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
    backend: ["Node.js", "Express.js", "Next.js API", "Prisma"],
    database: ["MongoDB", "PostgreSQL", "MySQL"],
    tools: ["Git", "AWS", "Vercel", "VS Code", "Postman", "NginX"],
  };

  return (
    <div className="text-start lg:p-6 h-auto">
      <span className="lg:text-3xl text-xl font-semibold aboutMe">
        {" "}
        <FlipText className="aboutMe -tracking-widest ">My Resume</FlipText>
      </span>
      <div className="border-t border-4 border-yellow-600 w-full max-w-14 my-4 rounded-xl"></div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="aboutMe text-xl">
          <BookOpen className="inline-block mr-2 text-yellow-500 w-12 h-12 p-3 border-1 rounded-xl" />
          Education
        </div>
        <div className="text-gray-500 text-sm ml-14 flex flex-col gap-1">
          <span className="text-zinc-100 block aboutMe md:text-[16px] text-sm">
            Vishwakarma Institute Of Information Technology - Pune
          </span>
          <span className="text-yellow-500 block">2020 - 2024</span>
          <span className="">Bachelor of Technology</span>
        </div>
        <div className="aboutMe text-xl">
          <SquareCode className="inline-block mr-2 text-yellow-500 w-12 h-12 p-3 border-1 rounded-xl" />
          Experience
        </div>
        <div className="text-gray-500 text-sm ml-14 flex flex-col gap-1">
          <span className="text-zinc-100 block aboutMe md:text-[16px] text-sm">
            FullStack Developer Freelance
          </span>
          <span className="text-yellow-500 block">
            September 2024 - Present 2025
          </span>
          <span className="text-zinc-100 block aboutMe md:text-[16px] text-sm">
            Frontend Developer Intern - Sciqus
          </span>
          <span className="text-yellow-500 block">
            February 2024 - August 2024
          </span>
          <p className="text-zinc-300 mt-2 lg:w-[40rem] md:text-[16px] text-sm">
            Freelance Full Stack Developer at The Fortune Club, building SaaS
            products and marketing websites using React, Node.js, Supabase, and
            more. Previously worked at Sciqus Infotech as a Frontend Intern,
            delivering responsive UIs and optimizing performance with lazy
            loading and API integrations.
          </p>
        </div>
      </div>
      <span className="text-2xl aboutMe">My Skills</span>
      <div className="grid grid-cols-1 gap-6 mt-4 border border-zinc-500 px-12 py-8 rounded-2xl">
        <div>
          <span className="text-[16px] aboutMe text-zinc-400 block mb-3">
            Languages
          </span>
          <div className="flex flex-wrap gap-2">
            {techStacks.languages.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 p-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[16px] aboutMe text-zinc-400 block mb-3">
            Frontend
          </span>
          <div className="flex flex-wrap gap-2">
            {techStacks.frontend.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 p-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[16px] aboutMe text-zinc-400 block mb-3">
            Backend
          </span>
          <div className="flex flex-wrap gap-2">
            {techStacks.backend.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-green-900/30 text-green-300 hover:bg-green-900/50 p-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[16px] aboutMe text-zinc-400 block mb-3">
            Database
          </span>
          <div className="flex flex-wrap gap-2">
            {techStacks.database.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-900/30 text-purple-300 hover:bg-purple-900/50 p-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[16px] aboutMe text-zinc-400 block mb-3">
            Tools & Technologies
          </span>
          <div className="flex flex-wrap gap-2">
            {techStacks.tools.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-orange-900/30 text-orange-300 hover:bg-orange-900/50 p-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
