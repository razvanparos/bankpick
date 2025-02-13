import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { sendMoney } from "../services/transactionsService.ts";
import { addTransaction } from "../services/transactionsService.ts";
import Loader from "../components/Loader.tsx";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/InputComponent.tsx";
function Send() {
  const navigate = useNavigate();
  const [sendToId, setSendToId] = useState("");
  const [sendAmount, setSendAmount] = useState('');
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
          <FormRow labelText="Email or User ID">
            <InputComponent
              value={sendToId}
              type="text"
              placeholder={""}
              onChangeFunction={(e) => {
                setSendToId(e.target.value);
              }}
            />
          </FormRow>
          <FormRow labelText="Amount $">
            <InputComponent
              type="number"
              value={sendAmount}
              placeholder={''}
              onChangeFunction={(e) => {
                setSendAmount(e.target.value);
              }}
            />
          </FormRow>
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
