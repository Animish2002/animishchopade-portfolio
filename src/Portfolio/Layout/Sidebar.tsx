"use client";
import React, { useState } from "react";
import profile from "@/assets/profile.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  Phone,
  Pin,
} from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="w-80 h-auto bg-zinc-900 text-white p-4 rounded-3xl border border-zinc-700 hover:shadow-zinc-700 relative md:block hidden">
        <div className="flex flex-col items-center justify-start gap-4 h-full">
          {/* Profile Section */}
          <div className="mt-6 relative mb-2">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              className="rounded-3xl"
            />
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

          <div className="border-t border-zinc-600 w-full max-w-56 my-4"></div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Mail className="text-yellow-500 w-10 h-10 p-2.5 border border-zinc-600 rounded-lg box" />
              </div>
              <a
                href="mailto:animishchopade123@gmail.com"
                className="text-[16px] text-zinc-300 hover:text-white break-all"
              >
                animishchopade123@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Phone className="text-yellow-500 w-10 h-10 p-2.5 border border-zinc-600 rounded-lg box" />
              </div>
              <span className="text-[16px] text-zinc-300">+91 9158067574</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Pin className="text-yellow-500 w-10 h-10 p-2.5 border border-zinc-600 rounded-lg box" />
              </div>
              <span className="text-[16px] text-zinc-300">
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

      {/* Mobile View */}
      <div className="w-full h-auto block md:hidden bg-zinc-900 text-white p-3 rounded-3xl border border-zinc-700 md:shadow-lg hover:shadow-zinc-700 relative">
        <div>
          <div className="flex  flex-row-1 items-center justify-start gap-6 h-full">
            <div className="relative">
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                className="rounded-3xl"
              />
              <Image
                src={profile}
                alt="profile"
                className="w-28 h-28 rounded-3xl object-cover"
              />
            </div>
            <div className="flex flex-col items-start text-left">
              <h2 className="text-lg font-semibold mb-2">Animish Chopade</h2>
              <Badge className="bg-zinc-800 hover:bg-zinc-700 text-zinc-50 lg:px-3 lg:py-1.5 text-xs rounded-lg lg:text-sm">
                Full Stack Developer
              </Badge>
            </div>
          </div>
        </div>

        {/* Toggle Arrow */}
        <div className="absolute top-[2.2px] right-[2.5px]">
          <button
            onClick={toggleDropdown}
            className="text-yellow-500 w-9 h-9 p-2.5 shadow-sm shadow-zinc-300/50 rounded-tr-2xl rounded-bl-2xl hover:bg-zinc-800 transition-colors"
          >
            {isDropdownOpen ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="mt-4 pt-4 border-t border-zinc-600">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Mail className="text-yellow-500 w-8 h-8 p-2 border border-zinc-600 rounded-lg" />
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
                  <Phone className="text-yellow-500 w-8 h-8 p-2 border border-zinc-600 rounded-lg" />
                </div>
                <span className="text-sm text-zinc-300">+91 9158067574</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Pin className="text-yellow-500 w-8 h-8 p-2 border border-zinc-600 rounded-lg" />
                </div>
                <span className="text-sm text-zinc-300">
                  Pune, Maharashtra, India
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex items-center justify-center gap-4 border-t border-zinc-600 pt-4">
              <a
                href="https://www.linkedin.com/in/animish-chopade"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 p-1.5 border border-zinc-600 rounded-lg hover:border-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/Animish2002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 p-1.5 border border-zinc-600 rounded-lg hover:border-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://x.com/animish06"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 p-1.5 border border-zinc-600 rounded-lg hover:border-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center"
                title="Twitter/X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
