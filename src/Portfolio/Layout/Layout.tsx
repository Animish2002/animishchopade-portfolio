import Sidebar from "./Sidebar";
import Dashoard from "./Dashoard";
import React from "react";

const Layout = () => {
  return (
    <div className="py-20 px-24 flex flex-row gap-4">
      <Sidebar />
      <Dashoard />
    </div>
  );
};

export default Layout;
