import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import Loader from "../components/Loader.tsx";
import { addMoney } from "../services/transactionsService.ts";
import { addTransaction } from "../services/transactionsService.ts";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent.tsx";

function TopUp() {
  const navigate = useNavigate();
  const [topUp, setTopUp] = useState('');
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
          <FormRow labelText="Amount $">
            <InputComponent
              type="number"
              placeholder={''}
              value={topUp}
              onChangeFunction={(e) => {
                setTopUp(e.target.value);
              }}
            />
          </FormRow>
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
