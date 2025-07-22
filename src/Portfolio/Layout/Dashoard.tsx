import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutMe from "@/Portfolio/AboutMe";
import Resume from "@/Portfolio/Resume";
import Projects from "@/Portfolio/Projects";
import Contact from "@/Portfolio/Contact";

const Dashboard = () => {
  return (
    <div className="lg:w-[75rem] w-auto h-auto bg-zinc-900 text-white p-4 rounded-3xl border border-zinc-700 md:shadow-lg hover:shadow-zinc-700 relative">
      <Tabs defaultValue="about" className="w-full h-full">
        {/* Desktop tabs - top/right positioned */}
        <div className="hidden lg:block lg:absolute lg:top-0 lg:right-0 lg:w-[28rem] h-12 z-50">
          <TabsList className="w-full h-full bg-zinc-800 rounded-t-3xl">
            <TabsTrigger value="about" className="w-1/4 h-full text-yellow-500">
              About Me
            </TabsTrigger>
            <TabsTrigger value="resume" className="w-1/4 h-full text-yellow-500">
              Resume
            </TabsTrigger>
            <TabsTrigger value="projects" className="w-1/4 h-full text-yellow-500">
              Projects
            </TabsTrigger>
            <TabsTrigger value="contact" className="w-1/4 h-full text-yellow-500">
              Contact
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Mobile tabs - bottom positioned, full width */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 z-50 ">
          <TabsList className="w-full h-full bg-zinc-800 rounded-none border-t border-zinc-700 rounded-t-[25px] border-t-zinc-700 px-14 opacity-90 py-3">
            <TabsTrigger value="about" className="flex-1 h-full text-yellow-500 rounded-lg py-4">
              About Me
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex-1 h-full text-yellow-500 rounded-lg py-4">
              Resume
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1 h-full text-yellow-500 rounded-lg py-4">
              Projects
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1 h-full text-yellow-500 rounded-lg py-4">
              Contact
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content area with bottom padding on mobile to account for fixed tabs */}
        <div className="pb-16 lg:pb-0">
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

export default Dashboard;