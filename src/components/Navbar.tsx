import * as React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { LuWalletCards } from "react-icons/lu";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import NavbarButton from "./NavbarButton.tsx";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate()
  return <nav className={`
  z-20 bg-darkGray px-8 sm:px-[25%] fixed bottom-0 w-screen h-[80px] shadow-2xl shadow-black flex lg:flex-col justify-between items-center
  lg:w-[100px] lg:h-[450px] lg:sticky lg:top-8 lg:mt-8 lg:rounded-xl lg:shadow-sm lg:p-8
  `}>
    <NavbarButton text={'Home'} icon={<AiOutlineHome />} onClickFunction={()=>{navigate('/')}}/>
    <NavbarButton text={'Cards'} icon={< LuWalletCards/>} onClickFunction={()=>{navigate('/cards')}}/>
    <NavbarButton text={'Stats'} icon={< AiOutlinePieChart/>} onClickFunction={()=>{navigate('/stats')}}/>
    <NavbarButton text={'Settings'} icon={<IoSettingsOutline />} onClickFunction={()=>{navigate('/settings')}}/>
  </nav>;
}

export default Navbar;
