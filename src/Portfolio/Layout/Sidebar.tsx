import React from "react";
import profile from "@/assets/profile.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Phone, Pin } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-80 h-[80vh] bg-zinc-900 text-white p-6 rounded-3xl border border-zinc-700 md:shadow-lg hover:shadow-zinc-700">
      <div className="flex flex-col items-center justify-start gap-4 h-full">
        {/* Profile Section */}
        <div className="mt-6 mb-2">
          <Image
            src={profile}
            alt="profile"
            className="w-44 h-44 rounded-3xl object-cover"
            width={176}
            height={176}
          />
        </div>

        {/* Name and Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold mb-2">Animish Chopade</h2>
          <Badge className="bg-zinc-800 hover:bg-zinc-700 text-zinc-50 px-3 py-1.5 rounded-lg text-sm">
            Full Stack Developer
          </Badge>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-600 w-full max-w-56 my-4"></div>

        {/* Contact Information */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Mail className="text-yellow-500 w-10 h-10 p-2.5 border border-zinc-600 rounded-lg box" />
            </div>
            <a
              href="mailto:animishchopade123@gmail.com"
              className="text-sm text-zinc-300 hover:text-white break-all"
            >
              animishchopade123@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Phone className="text-yellow-500 w-10 h-10 p-2.5 border border-zinc-600 rounded-lg box" />
            </div>
            <span className="text-sm text-zinc-300">+91 9158067574</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Pin className="text-yellow-500 w-10 h-10 p-2.5 border border-zinc-600 rounded-lg box" />
            </div>
            <span className="text-sm text-zinc-300">
              Pune, Maharashtra, India
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/animish-chopade"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 p-2 border border-zinc-600 rounded-lg hover:border-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://github.com/Animish2002"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 p-2 border border-zinc-600 rounded-lg hover:border-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://x.com/animish06"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 p-2 border border-zinc-600 rounded-lg hover:border-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center"
            title="Twitter/X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
