import * as React from "react";
import { Slide } from "react-awesome-reveal";
import ButtonComponent from "../components/ButtonComponent.tsx";
import PageHeader from "../components/PageHeader.tsx";
import { logoutUser } from "../services/authService.ts";
import { useNavigate } from "react-router-dom";
function Settings() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser(navigate);
  };
  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300}>
        <PageHeader text={"Settings"} />
        <ButtonComponent
          text="Log out"
          type="secondary"
          onClickFunction={handleLogout}
        />
      </Slide>
    </article>
  );
}

export default Settings;
