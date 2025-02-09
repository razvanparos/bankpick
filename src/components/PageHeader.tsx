import * as React from "react";
import IconComponent from "./IconComponent.tsx";
import { useNavigate } from "react-router-dom";
function PageHeader({ text, icon }) {
  const navigate = useNavigate();
  return (
    <section className="flex items-center justify-between">
      <IconComponent
        icon={icon}
        onClickFunction={() => {
          navigate(-1);
        }}
      />
      <h2 className="text-2xl">{text}</h2>
      <span></span>
    </section>
  );
}

export default PageHeader;
