import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import ellipse from '../assets/Ellipse 1.png'
function Layout() {
  return (
    <main className="flex justify-center gap-x-8 mb-[45px] lg:mb-0">
      <Navbar/>
      <Outlet />
      <img className=' lg:w-[400px] absolute top-[25%] -z-10 right-0' src={ellipse} alt="" />
      <img className='lg:w-[300px] absolute top-[55%] -z-10 left-0 rotate-180' src={ellipse} alt="" />
    </main>
  );
}

export default Layout;
