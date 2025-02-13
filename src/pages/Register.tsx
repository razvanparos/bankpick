import React, { useState } from "react";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService.ts";
import Loader from "../components/Loader.tsx";
import NotificationActions from "../context/actions/notificationActions.ts";
import { addNewUser } from "../services/usersService.ts";
import PageHeader from "../components/PageHeader.tsx";
import { Slide } from "react-awesome-reveal";
import InputComponent from "../components/InputComponent.tsx";

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
      await addNewUser(registerState.registerName, registerState.registerEmail);
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
    <Slide direction={"down"} duration={400}>
      <main className="flex flex-col items-center h-[100vh] p-4">
        <form
          onSubmit={handleRegister}
          className="max-w-[400px] w-full flex flex-col gap-y-6 lg:mt-[105px]"
        >
          <PageHeader text={"Sign up"} />

          <FormRow labelText="Full Name">
              <InputComponent
                value={registerState.registerName}
                placeholder=""
                type="text"
                onChangeFunction={(e) => {
                  changeRegisterState("registerName", e.target.value);
                }}
              />
            </FormRow>
            <FormRow labelText="Email address">
              <InputComponent
                value={registerState.registerEmail}
                placeholder=""
                type="email"
                onChangeFunction={(e) => {
                  changeRegisterState("registerEmail", e.target.value);
                }}
              />
            </FormRow>
            <FormRow labelText="Password">
              <InputComponent
                value={registerState.registerPassword}
                placeholder=""
                type="password"
                onChangeFunction={(e) => {
                  changeRegisterState("registerPassword", e.target.value);
                }}
              />
            </FormRow>
          <ButtonComponent
            text={registerState.loading ? <Loader /> : "Sign Up"}
            type="primary"
          />
        </form>
      </main>
    </Slide>
  );
}

export default Register;
