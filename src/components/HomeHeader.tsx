import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.tsx";
import ButtonComponent from "./ButtonComponent.tsx";
function HomeHeader() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { userData } = state;
  return (
    <header className="flex items-center gap-x-4">
      <ButtonComponent
        type="homeHeader"
        text=""
        onClickFunction={() => {
          navigate("/settings");
        }}
      >
        <FaUser className="text-2xl" />
      </ButtonComponent>
      <div>
        <p className="text-sm text-gray">Welcome back,</p>
        <h2 className="text-xl">{userData[0]?.fullName}</h2>
      </div>
    </header>
  );
}

export default HomeHeader;
