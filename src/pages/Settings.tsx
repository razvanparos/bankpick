import React,{useContext} from "react";
import { Slide } from "react-awesome-reveal";
import ButtonComponent from "../components/ButtonComponent.tsx";
import PageHeader from "../components/PageHeader.tsx";
import InfoRow from "../components/InfoRow.tsx";
import { logoutUser } from "../services/authService.ts";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.tsx";


function Settings() {
  const {state} = useContext(AppContext)
  const {userData} = state
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser(navigate);
  };
  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300}>
        <PageHeader text={"Settings"} />
        <InfoRow text={`ID: ${userData[0].id}`}/>
        <InfoRow text={`${userData[0].email}`}/>
        <ButtonComponent
          text="Log out"
          type="secondary"
          onClickFunction={handleLogout}
        />
        <p className='text-center text-gray text-sm'>Joined on {userData[0].joined}</p>
      </Slide>
    </article>
  );
}

export default Settings;
