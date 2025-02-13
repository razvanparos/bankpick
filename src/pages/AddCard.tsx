import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import PageHeader from "../components/PageHeader.tsx";
import Card from "../components/Card.tsx";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import { addNewCard } from "../services/cardsService.ts";
import Loader from "../components/Loader.tsx";
import InputComponent from "../components/InputComponent.tsx";
import ColorPicker from "../components/ColorPicker.tsx";
function AddCard() {
  const navigate = useNavigate();
  const initialCardState = {
    cardNumber: "",
    cardName: "",
    expireYear: '',
    expireMonth: '',
    cardCvv: '',
    cardColor: 'gray',
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
    if (await addNewCard(cardState)) navigate("/cards");
    changeCardState("loading", false);
  };

  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Add New Card"} />
        <Card card={cardState} isFlippedDefault={true} />
        <form onSubmit={handleCardSubmit} className="flex flex-col gap-y-8">
          <ColorPicker onChangeFunction={changeCardState} cardColor={cardState.cardColor}/>
          <FormRow labelText="Cardholder Name">
            <InputComponent
              value={cardState.cardName}
              placeholder={""}
              type={"text"}
              onChangeFunction={(e) => {
                changeCardState("cardName", e.target.value);
              }}
            />
          </FormRow>
          <FormRow labelText="Card Number">
            <InputComponent
              value={cardState.cardNumber}
              placeholder={""}
              type={"number"}
              onChangeFunction={(e) => {
                changeCardState("cardNumber", e.target.value);
              }}
            />
          </FormRow>
          <div className="flex justify-between gap-x-24">
            <div>
              <p className="text-sm text-gray">Expire date</p>
              <div className="flex items-center max-w-[250px]">
                <FormRow>
                  <InputComponent
                    value={cardState.expireMonth}
                    placeholder={"mm"}
                    type={"number"}
                    onChangeFunction={(e) => {
                      changeCardState("expireMonth", e.target.value);
                    }}
                  />
                </FormRow>
                <p>/</p>
                <FormRow>
                  <InputComponent
                    value={cardState.expireYear}
                    placeholder={"yy"}
                    type={"number"}
                    onChangeFunction={(e) => {
                      changeCardState("expireYear", e.target.value);
                    }}
                  />
                </FormRow>
              </div>
            </div>
            <FormRow labelText="CVV">
              <InputComponent
                value={cardState.cardCvv}
                placeholder={""}
                type={"number"}
                onChangeFunction={(e) => {
                  changeCardState("cardCvv", e.target.value);
                }}
              />
            </FormRow>
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
