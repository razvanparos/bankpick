import React, { useState } from "react";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { registerUser } from "../services/authService.ts";
import Loader from "../components/Loader.tsx";
import NotificationActions from "../context/actions/notificationActions.ts";
import { addNewUser } from "../services/usersService.ts";
import PageHeader from "../components/PageHeader.tsx";

function Register() {
  const navigate = useNavigate();
  const initialRegisterState = {
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    loading: false,
  };
  const [registerState, setRegisterState] = useState(initialRegisterState);

  const changeRegisterState = (fieldname, value) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [fieldname]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    changeRegisterState("loading", true);
    try {
      await registerUser(
        registerState.registerName,
        registerState.registerEmail,
        registerState.registerPassword
      );
      await addNewUser(registerState);
      NotificationActions.showNotification(
        "Registered successfully!",
        "normal"
      );
      navigate("/login");
    } catch (err) {
      NotificationActions.showNotification(err, "danger");
    }
    changeRegisterState("loading", false);
  };

  return (
    <main className="flex flex-col items-center h-[100vh] p-4 mt-12">
      <form
        onSubmit={handleRegister}
        className="max-w-[400px] w-full flex flex-col gap-y-6 lg:mt-[105px]"
      >
        <PageHeader text={"Sign up"} />

        <FormRow
          type="text"
          labelText="Full name"
          onChangeFunction={(e) => {
            changeRegisterState("registerName", e.target.value);
          }}
        />
        <FormRow
          type="email"
          labelText="Email address"
          onChangeFunction={(e) => {
            changeRegisterState("registerEmail", e.target.value);
          }}
        />
        <FormRow
          type="password"
          labelText="Password"
          onChangeFunction={(e) => {
            changeRegisterState("registerPassword", e.target.value);
          }}
        />
        <ButtonComponent
          text={registerState.loading ? <Loader /> : "Sign Up"}
          type="primary"
        />
      </form>
    </main>
  );
}

export default Register;
