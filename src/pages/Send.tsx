import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { addTransaction, sendMoney } from "../services/usersService.ts";
import Loader from "../components/Loader.tsx";
import { useNavigate } from "react-router-dom";
function Send() {
  const navigate = useNavigate();
  const [sendToId, setSendToId] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSendMoney = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      (await sendMoney(sendToId, sendAmount)) &&
      (await addTransaction(
        localStorage.getItem("currentUser"),
        sendAmount,
        "expense",
        "Transfer"
      )) &&
      (await addTransaction(sendToId, sendAmount, "income", "Transfer"))
    ) {
    } else {
      setLoading(false);
      return;
    }
    navigate("/");
  };

  return (
    <article className="flex flex-col gap-y-8 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Send money"} />
        <h2 className="text-lg">Send To</h2>
        <form onSubmit={handleSendMoney} className="flex flex-col gap-y-8">
          <FormRow
            type="text"
            labelText="Email or User ID"
            onChangeFunction={(e) => {
              setSendToId(e.target.value);
            }}
          />
          <FormRow
            type="number"
            labelText="Amount $"
            onChangeFunction={(e) => {
              setSendAmount(e.target.value);
            }}
          />
          <ButtonComponent
            text={loading ? <Loader /> : "Send Money"}
            type="primary"
          />
        </form>
      </Slide>
    </article>
  );
}

export default Send;
