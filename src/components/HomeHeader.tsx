import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.tsx";
function HomeHeader() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { userData } = state;
  return (
    <header className="flex items-center gap-x-4">
      <button
        onClick={() => {
          navigate("/settings");
        }}
        className="w-[55px] h-[55px] bg-lightGray rounded-full flex items-center justify-center cursor-pointer"
      >
        <FaUser className="text-2xl" />
      </button>
      <div>
        <p className="text-sm text-gray">Welcome back,</p>
        <h2 className="text-xl">{userData[0]?.fullName}</h2>
      </div>
    </header>
  );
}

export default HomeHeader;
