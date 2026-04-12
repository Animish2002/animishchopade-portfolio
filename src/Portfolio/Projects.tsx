import React from "react";
import { HoverEffect } from "@/components/card-hover-effect";
import { FlipText } from "@/components/ui/flip-text";

// Base CDN URL with automatic format + quality optimisation applied at the CDN edge.
// Moving this outside the component means it is computed once at module load, never
// re-created on re-renders.
const CDN =
  "https://res.cloudinary.com/dkv3bx51z/image/upload/f_auto,q_auto";

const projects = [
  {
    title: "Xopy (Patent Project)",
    image: `${CDN}/xopy_azpyoy.png`,
    link: "https://xopy.in/",
    description:
      "A Cloud based Web-portal for Convenient and Secure File Sharing to Local Photocopy Centers.",
    category: "Web App",
  },
  {
    title: "FitFocus (AI Powered Fitness and Nutrition App)",
    image: `${CDN}/fitfocus_2_qnbu8t.png`,
    link: "https://fitfocus.animishchopade.in/",
    description:
      "AI Powered Fitness and Nutrition App that helps in achieving a healthy lifestyle with customized plans.",
    category: "Fullstack",
  },
  {
    title: "KCAL - Calorie Tracker",
    image: `${CDN}/v1776014244/edfd913b-9ac0-4613-b1a3-a4a90f7b6ccd.png`,
    link: "https://kcal-app.animishchopade.in/",
    description:
      "A calorie and nutrition tracking app to help users monitor their daily intake, set health goals, and maintain a balanced lifestyle.",
    category: "Web App",
  },
  {
    title: "LifeFirst Concepts & Technologies Pvt. Ltd.",
    image: `${CDN}/v1763306914/772c1926-4a83-4a3c-9724-6ca1ee472c3f.png`,
    link: "https://www.life-first.in/",
    description:
      "Designed and developed a high-impact landing page for LifeFirst Concepts & Technologies Pvt. Ltd., built to showcase their products and services and strengthen customer acquisition.",
    category: "Fullstack",
  },
  {
    title: "CRM for Property Advocate",
    image: `${CDN}/v1738685386/8ba7ce7f-7b18-4fc7-8586-f4fd4fd48dad.png`,
    link: "https://www.pratikagrawal.in/",
    description:
      "A CRM built for a Property Advocate to track and manage his cases and daily logs efficiently.",
    category: "Business",
  },
  {
    title: "Portfolio Website - 2024",
    image: `${CDN}/v1753266222/2024_yz9tcu.png`,
    link: "https://2024.animishchopade.in/",
    description:
      "A Responsive Portfolio Website to showcase my skills and projects.",
    category: "Frontend",
  },
  {
    title: "Anuj Bagade",
    image: `${CDN}/v1752318121/anuj_work_mvr6zt.png`,
    link: "https://www.anujbagade.com/",
    description:
      "Developed a responsive landing page for a Content Creator, helped him start his Ed-Tech platform by integrating a LMS platform.",
    category: "Business",
  },
  {
    title: "Aadarsh Institute",
    image: `${CDN}/v1756969059/68347166-b87a-4ac7-b5ce-4db19376d562.png`,
    link: "https://aadarshinstitute.in/",
    description:
      "A freelance project for an educational institute, designed and developed to showcase courses, improve online presence, and included a student testimonial section.",
    category: "Business",
  },
  {
    title: "Anita Ayurveda & Panchkarma",
    image: `${CDN}/v1741418427/Screenshot_2025-03-08_124729_p5hlln.png`,
    link: "https://www.anitaayurveda.in/",
    description:
      "A freelance project for an Ayurvedic clinic, designed and developed to showcase services and improve online presence.",
    category: "Business",
  },
  {
    title: "Vastu Decor & Home Solutions",
    image: `${CDN}/v1745862541/c2e6db63-b364-4306-af5d-75c89fc6ae92.png`,
    link: "https://www.vastudecor.site/",
    description:
      "A freelance project for Vastu Decor, designed and developed to showcase the firm's work, enhance its online presence, included a design gallery.",
    category: "Business",
  },
  {
    title: "MotoGlazer",
    image: `${CDN}/v1738154304/d2705453-1d4c-420b-82d4-4cd6b58b4f93.png`,
    link: "https://motoglazer.animishchopade.in/",
    description:
      "MotoGlazer is about the passion for riding, the thrill of speed, the sound of the exhaust, and the freedom of the road.",
    category: "Frontend",
  },
  {
    title: "Travel Agency",
    image: `${CDN}/travel-Agency_zw7s4c.png`,
    link: "https://travelagency.animishchopade.in/",
    description:
      "A Responsive Travel Agency Website to book all your dream destination tours.",
    category: "Frontend",
  },
  {
    title: "Wick Wear",
    image: `${CDN}/50e1a030-838f-4ecc-b3bc-2808d812e499.png`,
    link: "https://weakwear.animishchopade.in/",
    description:
      "Inspired by John Wick's world, a sleek e-commerce platform for efficient product management.",
    category: "E-commerce",
  },
];

const Projects = () => {
  return (
    <div className="text-start md:p-6">
      <span className="lg:text-3xl text-xl font-semibold aboutMe">
        <FlipText className="aboutMe -tracking-widest">Projects</FlipText>
      </span>
      <div className="border-t border-4 border-yellow-600 w-full max-w-14 my-4 rounded-xl"></div>
      <div className="text-center text-sm">Click to view more</div>
      <div>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
};

export default Projects;
