import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import Loader from "../components/Loader.tsx";
import { addMoney, addTransaction } from "../services/usersService.ts";
import { useNavigate } from "react-router-dom";

function TopUp() {
  const navigate = useNavigate();
  const [topUp, setTopUp] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleTopMoney = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      (await addMoney(topUp)) &&
      (await addTransaction(
        localStorage.getItem("currentUser"),
        topUp,
        "income",
        "Top Up"
      ))
    ) {
    } else {
      setLoading(false);
      return;
    }

    navigate("/");
  };
  return (
    <article className="flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Top Up"} />
        <h2 className="text-lg">Add money</h2>
        <form onSubmit={handleTopMoney} className="flex flex-col gap-y-8">
          <FormRow
            type="number"
            labelText="Amount $"
            onChangeFunction={(e) => {
              setTopUp(e.target.value);
            }}
          />
          <ButtonComponent
            text={loading ? <Loader /> : "Add Money"}
            type="primary"
          />
        </form>
      </Slide>
    </article>
  );
}

export default TopUp;
