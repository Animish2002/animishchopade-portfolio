import Sidebar from "./Sidebar";
import Dashoard from "./Dashoard";
import React from "react";

const Layout = () => {
  return (
    <div className="md:py-20 md:px-24 p-2 py-5 flex lg:flex-row flex-col lg:gap-4 gap-2 justify-center items-start bg-zinc-800 min-h-screen">
      <Sidebar />
      <Dashoard />
    </div>
  );
};

export default Layout;
