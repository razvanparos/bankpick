import * as React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function HomeHeader({ fullName }) {
    const navigate = useNavigate()
  return (
    <header className="flex items-center gap-x-4">
      <div
        onClick={() => {navigate('/settings')}}
        className="w-[55px] h-[55px] bg-lightGray rounded-full flex items-center justify-center cursor-pointer"
      >
        <FaUser className="text-2xl" />
      </div>
      <div>
        <p className="text-sm text-gray">Welcome back,</p>
        <h2 className="text-xl">{fullName}</h2>
      </div>
    </header>
  );
}

export default HomeHeader;
