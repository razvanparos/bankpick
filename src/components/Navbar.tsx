import * as React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { LuWalletCards } from "react-icons/lu";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent.tsx";
function Navbar() {
  const navigate = useNavigate();
  return (
    <nav
      className={`
  z-20 bg-darkGray px-8 pb-4 sm:px-[25%] fixed bottom-0 w-screen h-[100px] shadow-2xl shadow-black flex lg:flex-col justify-between items-center
  lg:w-[100px] lg:h-[450px] lg:sticky lg:top-8 lg:mt-8 lg:rounded-xl lg:shadow-sm lg:p-8
  `}
    >
      <ButtonComponent
        text={"Home"}
        type="navButton"
        onClickFunction={() => {
          navigate("/");
        }}
      >
        {<AiOutlineHome className="text-3xl" />}
      </ButtonComponent>

      <ButtonComponent
        text={"Cards"}
        type="navButton"
        onClickFunction={() => {
          navigate("/cards");
        }}
      >
        {<LuWalletCards className="text-3xl" />}
      </ButtonComponent>

      <ButtonComponent
        text={"Stats"}
        type="navButton"
        onClickFunction={() => {
          navigate("/stats");
        }}
      >
        {<AiOutlinePieChart className="text-3xl" />}
      </ButtonComponent>

      <ButtonComponent
        text={"Settings"}
        type="navButton"
        onClickFunction={() => {
          navigate("/settings");
        }}
      >
        {<IoSettingsOutline className="text-3xl" />}
      </ButtonComponent>
    </nav>
  );
}

export default Navbar;
