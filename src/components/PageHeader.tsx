import * as React from "react";
import IconComponent from "./IconComponent.tsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
function PageHeader({ text }) {
  const navigate = useNavigate();
  return (
    <section className="flex items-center gap-x-4">
      <IconComponent
        icon={<MdOutlineKeyboardArrowLeft/>}
        onClickFunction={() => {
          navigate(-1);
        }}
      />
      <h2 className="text-2xl">{text}</h2>
    </section>
  );
}

export default PageHeader;
