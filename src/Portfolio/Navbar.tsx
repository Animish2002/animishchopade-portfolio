"use client";
import { ModeToggle } from "@/components/themetoggle";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full py-3">
      <nav className="flex items-center justify-between h-full px-4 text-slate-900 py-4 max-w-7xl mx-auto dark:text-slate-50">
        <div className="text-xl font-bold md:text-2xl hidden md:block">
          Animish Chopade
        </div>
        <li className="hover:cursor-pointer md:hidden block">
          <ModeToggle />
        </li>
        <ul className="flex space-x-8 items-center justify-center text-lg md:text-lg">
          <li className="hover:cursor-pointer hidden md:block">
            <ModeToggle />
          </li>
          <li className="hover:cursor-pointer md:hover:shadow-md md:hover:shadow-slate-500/50 ">
            Home
          </li>
          <li className="hover:cursor-pointer md:hover:shadow-md md:hover:shadow-slate-500/50 ">
            Projects
          </li>
          <li className="hover:cursor-pointer hover:shadow-md hover:shadow-slate-500/50 hidden md:block ">
            Resume
          </li>
          <li className="hover:cursor-pointer hover:shadow-md hover:shadow-slate-500/50 hidden md:block ">
            Contact
          </li>
          <div className="flex items-center space-x-2 md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="z-50 flex items-center justify-center rounded-full h-10 w-10 transition-colors"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-2xl" />
              )}
            </motion.button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-24 right-0 inset-0 z-30 bg-white dark:bg-slate-900 md:hidden h-[30vh] w-[20rem] opacity-50 mx-auto shadow-2xl dark:shadow-slate-800 rounded-lg overflow-hidden"
              >
                <div className="flex flex-col p-6 pt-18">
                  <motion.nav
                    className="flex flex-col gap-4"
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    <ul className="flex flex-col space-y-4 text-center text-lg">
                      <li className="hover:cursor-pointer ">Resume</li>
                      <li className="hover:cursor-pointer">Contact</li>
                    </ul>
                  </motion.nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
