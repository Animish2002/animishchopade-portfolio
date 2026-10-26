const CDN = "https://res.cloudinary.com/dkv3bx51z/image/upload/f_auto,q_auto";

export const profile = {
  name: "Animish Chopade",
  role: "Full Stack Developer",
  email: "animishchopade123@gmail.com",
  phone: "+91 9158067574",
  phoneHref: "tel:+919158067574",
  location: "Pune, Maharashtra, India",
  photo: `${CDN}/v1776012662/IMG-20250503-WA0076.jpg_rzx0tr.jpg`,
  current: "Software Developer @ Qnopy India",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Animish2002" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/animish-chopade" },
  { label: "Twitter / X", href: "https://x.com/animish06" },
  { label: "Instagram", href: "https://www.instagram.com/animish_06/" },
];

export type Project = {
  title: string;
  image: string;
  link: string;
  description: string;
  category: string;
};

export const projects: Project[] = [
  {
    title: "Xopy",
    image: `${CDN}/xopy_azpyoy.png`,
    link: "https://xopy.in/",
    description:
      "Patent project — a cloud web portal for convenient, secure file sharing with local photocopy centers.",
    category: "Web App",
  },
  {
    title: "FitFocus",
    image: `${CDN}/fitfocus_2_qnbu8t.png`,
    link: "https://fitfocus.animishchopade.in/",
    description:
      "AI-powered fitness and nutrition app with customized plans for a healthier lifestyle.",
    category: "Fullstack",
  },
  {
    title: "KCAL",
    image: `${CDN}/v1776014244/edfd913b-9ac0-4613-b1a3-a4a90f7b6ccd.png`,
    link: "https://kcal-app.animishchopade.in/",
    description:
      "Calorie and nutrition tracker to monitor daily intake, set goals and stay balanced.",
    category: "Web App",
  },
  {
    title: "LifeFirst",
    image: `${CDN}/v1763306914/772c1926-4a83-4a3c-9724-6ca1ee472c3f.png`,
    link: "https://www.life-first.in/",
    description:
      "High-impact landing page for LifeFirst Concepts & Technologies, built to drive customer acquisition.",
    category: "Fullstack",
  },
  {
    title: "Advocate CRM",
    image: `${CDN}/v1738685386/8ba7ce7f-7b18-4fc7-8586-f4fd4fd48dad.png`,
    link: "https://www.pratikagrawal.in/",
    description:
      "A CRM for a property advocate to track cases and daily logs efficiently.",
    category: "Business",
  },
  {
    title: "Anuj Bagade",
    image: `${CDN}/v1752318121/anuj_work_mvr6zt.png`,
    link: "https://www.anujbagade.com/",
    description:
      "Landing page for a content creator, plus an LMS integration to launch his ed-tech platform.",
    category: "Business",
  },
  {
    title: "Aadarsh Institute",
    image: `${CDN}/v1756969059/68347166-b87a-4ac7-b5ce-4db19376d562.png`,
    link: "https://aadarshinstitute.in/",
    description:
      "Website for an educational institute showcasing courses and student testimonials.",
    category: "Business",
  },
  {
    title: "Anita Ayurveda",
    image: `${CDN}/v1741418427/Screenshot_2025-03-08_124729_p5hlln.png`,
    link: "https://www.anitaayurveda.in/",
    description:
      "Website for an Ayurvedic & Panchkarma clinic to showcase services and grow online presence.",
    category: "Business",
  },
  {
    title: "Vastu Decor",
    image: `${CDN}/v1745862541/c2e6db63-b364-4306-af5d-75c89fc6ae92.png`,
    link: "https://www.vastudecor.site/",
    description:
      "Portfolio site with a design gallery for a home-solutions firm.",
    category: "Business",
  },
  {
    title: "Portfolio 2024",
    image: `${CDN}/v1753266222/2024_yz9tcu.png`,
    link: "https://2024.animishchopade.in/",
    description: "My previous responsive portfolio website.",
    category: "Frontend",
  },
  {
    title: "MotoGlazer",
    image: `${CDN}/v1738154304/d2705453-1d4c-420b-82d4-4cd6b58b4f93.png`,
    link: "https://motoglazer.animishchopade.in/",
    description:
      "For the passion of riding — speed, the sound of the exhaust, the freedom of the road.",
    category: "Frontend",
  },
  {
    title: "Travel Agency",
    image: `${CDN}/travel-Agency_zw7s4c.png`,
    link: "https://travelagency.animishchopade.in/",
    description: "Responsive travel agency site to book dream destination tours.",
    category: "Frontend",
  },
  {
    title: "Wick Wear",
    image: `${CDN}/50e1a030-838f-4ecc-b3bc-2808d812e499.png`,
    link: "https://weakwear.animishchopade.in/",
    description:
      "A John Wick–inspired e-commerce platform with efficient product management.",
    category: "E-commerce",
  },
];

export const services = [
  {
    title: "Frontend",
    description:
      "Beautiful, responsive and interactive interfaces with modern frameworks.",
    stack: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "RxJS"],
  },
  {
    title: "Backend",
    description:
      "Robust server-side apps, APIs and databases that power the product.",
    stack: ["Node.js", "Express", "Spring Boot", "Hono", "Drizzle ORM", "PostgreSQL"],
  },
];

// Oldest first: the career vine grows down from here.
export const career = [
  {
    period: "2020 — 2024",
    role: "B.Tech",
    org: "Vishwakarma Institute of Information Technology, Pune",
    description: "Bachelor of Technology.",
  },
  {
    period: "Feb 2024 — Aug 2024",
    role: "Frontend Developer Intern",
    org: "Sciqus Infotech",
    description:
      "Delivered responsive UIs and improved performance through lazy loading, code splitting and REST API integrations.",
  },
  {
    period: "Sep 2024 — Oct 2025",
    role: "Full Stack Developer",
    org: "Freelance",
    description:
      "Built SaaS products and marketing websites for clients at The Fortune Club with React, Next.js, Node.js and Supabase — CRMs, landing pages and LMS integrations.",
  },
  {
    period: "Oct 2025 — Present",
    role: "Software Developer",
    org: "Qnopy India",
    description:
      "Designing and developing scalable web applications — building features end-to-end with cross-functional teams and shipping production-quality code.",
  },
];

export const skills = {
  Languages: ["JavaScript", "TypeScript", "Java"],
  Frontend: ["React", "Next.js", "Angular", "RxJS", "Tailwind CSS", "HTML / CSS"],
  Backend: ["Node.js", "Express.js", "Spring Boot", "Hono", "Drizzle ORM", "Prisma"],
  Database: ["MongoDB", "PostgreSQL", "MySQL"],
  Tools: ["Git", "AWS", "Vercel", "Postman", "Nginx", "VS Code"],
};

export const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Angular",
  "Spring Boot",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Hono",
  "Drizzle ORM",
  "AWS",
];
