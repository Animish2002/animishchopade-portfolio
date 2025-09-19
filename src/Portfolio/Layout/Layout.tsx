import Sidebar from "./Sidebar";
import Dashoard from "./Dashoard";
import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { SpinningText } from "@/components/ui/spinning-text";

const Layout = () => {
  return (
    <>
      <div className="relative bg-black">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full overflow-hidden"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        <div className="md:py-20 md:px-24 p-2 py-5 flex lg:flex-row flex-col lg:gap-4 gap-2 justify-center items-start  min-h-screen">
          <Sidebar />
          <Dashoard />
        </div>
        <div className="right-20 bottom-20 fixed">
          <SpinningText className="text-zinc-300 text-lg hidden md:block" radius={4} >learn more • grow more •</SpinningText>
        </div>
      </div>
    </>
  );
};

export default Layout;
