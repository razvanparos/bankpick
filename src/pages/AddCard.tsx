import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import Card from "../components/Card.tsx";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { addNewCard } from "../services/usersService.ts";
import Loader from "../components/Loader.tsx";
function AddCard() {
  const navigate = useNavigate();
  const initialCardState = {
    cardNumber: "",
    cardName: "",
    expireYear: 0,
    expireMonth: 0,
    cardCvv: 0,
    loading: false,
  };
  const [cardState, setCardState] = useState(initialCardState);

  const changeCardState = (fieldname, value) => {
    setCardState((prevState) => ({
      ...prevState,
      [fieldname]: value,
    }));
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    changeCardState("loading", true);
    if(await addNewCard(cardState)) navigate("/cards")
    changeCardState("loading", false);
  };

  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Add New Card"} />
        <Card card={cardState} isFlippedDefault={true} />
        <form onSubmit={handleCardSubmit} className="flex flex-col gap-y-8">
          <FormRow
            type="text"
            labelText="Cardholder Name"
            onChangeFunction={(e) => {
              changeCardState("cardName", e.target.value);
            }}
          />
          <FormRow
            type="number"
            labelText="Card Number"
            onChangeFunction={(e) => {
              changeCardState("cardNumber", e.target.value);
            }}
          />
          <div className="flex justify-between gap-x-24">
            <div>
              <p className="text-sm text-gray">Expire date</p>
              <div className="flex items-center max-w-[250px]">
                <FormRow
                  type="number"
                  placeholder="mm"
                  onChangeFunction={(e) => {
                    changeCardState("expireMonth", e.target.value);
                  }}
                />
                <p>/</p>
                <FormRow
                  type="number"
                  placeholder="yy"
                  onChangeFunction={(e) => {
                    changeCardState("expireYear", e.target.value);
                  }}
                />
              </div>
            </div>
            <FormRow
              type="number"
              labelText="CVV"
              onChangeFunction={(e) => {
                changeCardState("cardCvv", e.target.value);
              }}
            />
          </div>
          <ButtonComponent
            text={cardState.loading ? <Loader /> : "Submit"}
            type="primary"
            onClickFunction={() => {
              navigate("/add-card");
            }}
          />
        </form>
      </Slide>
    </article>
  );
}

export default AddCard;
