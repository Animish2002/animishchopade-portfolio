import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { autoBest } from "@cloudinary/url-gen/qualifiers/quality";
import { HoverEffect } from "@/components/card-hover-effect";

const Projects = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dkv3bx51z" } });
  const cloudinaryImage1 = cld
    .image("travel-Agency_zw7s4c.png")
    .delivery(quality(autoBest()))
    .delivery(format("auto"))
    .toURL();
  const cloudinaryImage2 = cld
    .image("xopy_azpyoy.png")
    .delivery(quality(autoBest()))
    .delivery(format("auto"))
    .toURL();
  const cloudinaryImage3 = cld
    .image("50e1a030-838f-4ecc-b3bc-2808d812e499.png")
    .delivery(quality(autoBest()))
    .delivery(format("auto"))
    .toURL();
  const cloudinaryImage4 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1738154304/d2705453-1d4c-420b-82d4-4cd6b58b4f93.png";
  const cloudinaryImage5 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1738685386/8ba7ce7f-7b18-4fc7-8586-f4fd4fd48dad.png";
  const cloudinaryImage6 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1741418427/Screenshot_2025-03-08_124729_p5hlln.png";
  const cloudinaryImage7 =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1745862541/c2e6db63-b364-4306-af5d-75c89fc6ae92.png";
  const anujBagade =
    "https://res.cloudinary.com/dkv3bx51z/image/upload/v1752318121/anuj_work_mvr6zt.png";

  const projects = [
    {
      title: "Xopy (Patent Project)",
      image: cloudinaryImage2,
      link: "https://xopy.in/",
      description:
        "A Cloud based Web-portal for Convenient and Secure File Sharing to Local Photocopy Centers.",
      category: "Web App",
    },
    {
      title: "CRM for Property Advocate",
      image: cloudinaryImage5,
      link: "https://www.pratikagrawal.in/",
      description:
        "A CRM built for a Property Advocate to track and manage his cases and daily logs efficiently.",
      category: "Business",
    },
    {
      title: "Anuj Bagade",
      image: anujBagade,
      link: "https://www.anujbagade.com/",
      description:
        "Developed a responsive landing page for a Content Creator, helped him start his Ed-Tech platform by integrating a LMS Platform.",
      category: "Business",
    },
    {
      title: "Anita Ayurveda & Panchkarma",
      image: cloudinaryImage6, // Add the appropriate image URL here
      link: "https://www.anitaayurveda.in/",
      description:
        "A freelance project for an Ayurvedic clinic, designed and developed to showcase services, improve online presence",
      category: "Business",
    },
    {
      title: "Vastu Decor & Home Solutions",
      image: cloudinaryImage7, // Add the appropriate image URL here
      link: "https://www.vastudecor.site/",
      description:
        "A freelance project for Vastu Decor, designed and developed to showcase the firm's work, enhance its online presence, included a design gallery.",
      category: "Business",
    },

    {
      title: "MotoGlazer🏍️",
      image: cloudinaryImage4,
      link: "https://motoglazer.animishchopade.in/",
      description:
        "MotoGlazer is about the passion for riding, the thrill of speed, the sound of the exhaust, and the freedom of the road.",
      category: "Frontend",
    },
    {
      title: "Travel Agency",
      image: cloudinaryImage1,
      link: "https://travelagency.animishchopade.in/",
      description:
        "A Responsive Travel Agency Website to book all your dream destination tours.",
      category: "Frontend",
    },

    {
      title: "Wick Wear",
      image: cloudinaryImage3,
      link: "https://weakwear.animishchopade.in/",
      description:
        "Inspired by John Wick's world, a sleek e-commerce platform for efficient product management.",
      category: "E-commerce",
    },
  ];

  return (
    <div className="text-start md:p-6">
      <span className="lg:text-3xl text-xl font-semibold aboutMe">Projects</span>
      <div className="border-t border-4 border-yellow-600 w-full max-w-14 my-4 rounded-xl"></div>
      <div className="text-center text-sm">Click to view more</div>
      <div>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
};

export default Projects;
