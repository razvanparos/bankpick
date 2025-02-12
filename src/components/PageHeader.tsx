import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import ButtonComponent from "./ButtonComponent.tsx";
function PageHeader({ text }) {
  const navigate = useNavigate();
  return (
    <section className="flex items-center gap-x-4">
      <ButtonComponent
        type="icon"
        text=""
        onClickFunction={(e) => {
          e.preventDefault()
          navigate(-1);
        }}
      >
        {<MdOutlineKeyboardArrowLeft />}
      </ButtonComponent>

      <h2 className="text-2xl">{text}</h2>
    </section>
  );
}

export default PageHeader;
