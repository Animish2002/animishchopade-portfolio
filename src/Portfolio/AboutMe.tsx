"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import icon from "@/assets/icon-dev.svg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const AboutMe = () => {
  // Card data for Frontend and Backend
  const cardData = [
    {
      title: "Frontend Development",
      icon: icon,
      description:
        "Creating beautiful, responsive, and interactive user interfaces with modern frameworks and libraries.",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "JavaScript",
      ],
    },
    {
      title: "Backend Development",
      icon: icon,
      description:
        "Building robust server-side applications, APIs, and databases to power modern web applications.",
      technologies: [
        "Node.js",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "REST APIs",
      ],
    },
  ];

  return (
    <div className="text-start lg:p-6 h-auto lg:h-[76vh]">
      <span className="lg:text-3xl text-xl font-semibold aboutMe">
        About Me
      </span>
      <div className="border-t border-4 border-yellow-600 w-full max-w-14 my-4 rounded-xl"></div>
      <span>
        <p className="mt-2 lg:text-[16px] text-sm">
          {`Hi, I'm Animish Chopade, a Full Stack Developer who loves building
  user-friendly and efficient applications. I enjoy working on both the
  frontend and backend, bringing ideas to life with modern tools and
  technologies.`}
        </p>
        <p className="mt-2 lg:text-[16px] text-sm">
          {`I'm always eager to learn, solve problems, and build projects that
  make a difference. Whether it's improving functionality or enhancing
  the user experience, I love taking on new challenges and growing as a
  developer.`}
        </p>
      </span>
      <div className="mt-8">
        <span className="text-xl aboutMe">What I do:</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:mt-14 mt-4">
          <Card className="bg-zinc-900 p-8 hover:shadow-xl transition-shadow duration-300 shadow-[inset_-16px_12px_48px_#46464625]">
            <div className="flex items-center mb-4">
              <Image
                src={cardData[0].icon}
                alt="Frontend Development Icon"
                className="mr-4"
              />
              <h2 className="md:text-2xl text-lg font-semibold text-zinc-50">{cardData[0].title}</h2>
            </div>
            <p className="text-zinc-50 mb-2  md:text-[16px] text-sm">
              {cardData[0].description}
            </p>
            <ul className=" text-zinc-50 inline-flex flex-wrap gap-2">
              {cardData[0].technologies.map((tech, index) => (
                <li key={index}>
                  <Badge className="bg-zinc-50 text-zinc-900">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-zinc-900 p-8 hover:shadow-xl transition-shadow duration-300 shadow-[inset_-16px_12px_48px_#46464625]">
            <div className="flex items-center mb-2">
              <Image
                src={cardData[1].icon}
                alt="Frontend Development Icon"
                className="mr-4"
              />
              <h2 className="md:text-2xl text-lg font-semibold text-zinc-50">{cardData[1].title}</h2>
            </div>
            <p className="text-zinc-50 mb-4 md:text-[16px] text-sm">
              {cardData[1].description}
            </p>
            <ul className="text-zinc-50 inline-flex flex-wrap gap-2">
              {cardData[1].technologies.map((tech, index) => (
                <li key={index}>
                  <Badge className="bg-zinc-50 text-zinc-900">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
