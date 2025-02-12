import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import ellipse from "../assets/Ellipse 1.png";
import useLoadUserData from "../hooks/useLoadUserData.ts";
import FallbackComponent from "../components/FallbackComponent.tsx";

function Layout() {
  return !useLoadUserData() ? (
    <div className="flex justify-center items-center h-screen">
      <FallbackComponent />
    </div>
  ) : (
    <main className="flex justify-center gap-x-8 mb-[45px] lg:mb-0">
      <Navbar />
      <Outlet />
      <img
        className="lg:w-[400px] absolute top-[15%] -z-10 right-0"
        src={ellipse}
        alt=""
      />
      <img
        className="lg:w-[300px] absolute top-[42%] -z-10 left-0 rotate-180"
        src={ellipse}
        alt="" 
      />
    </main>
  );
}

export default Layout;
