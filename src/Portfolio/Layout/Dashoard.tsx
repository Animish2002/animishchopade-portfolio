import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutMe from "@/Portfolio/AboutMe";
import Resume from "@/Portfolio/Resume";
import Projects from "@/Portfolio/Projects";
import Contact from "@/Portfolio/Contact";

const Dashoard = () => {
  return (
    <div className="w-[75rem] h-[80vh]  bg-zinc-900  text-white p-4 rounded-3xl border border-zinc-700 md:shadow-lg hover:shadow-zinc-700 relative">
      <Tabs defaultValue="about" className="w-full h-full">
        <div className="top-0 right-0 absolute w-[28rem] h-12 ">
          <TabsList className="w-full h-full bg-zinc-800 rounded-t-3xl ">
            <TabsTrigger value="about" className="w-1/3 h-full text-yellow-500">
              About Me
            </TabsTrigger>
            <TabsTrigger
              value="resume"
              className="w-1/3 h-full text-yellow-500"
            >
              Resume
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="w-1/3 h-full text-yellow-500"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="w-1/3 h-full text-yellow-500"
            >
              Contact
            </TabsTrigger>
          </TabsList>
        </div>
        <div>
          <TabsContent value="about" className="w-full h-full">
            <AboutMe />
          </TabsContent>
          <TabsContent value="resume" className="w-full h-full">
            <Resume />
          </TabsContent>
          <TabsContent value="projects" className="w-full h-full">
            <Projects />
          </TabsContent>
          <TabsContent value="contact" className="w-full h-full">
            <Contact />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Dashoard;
