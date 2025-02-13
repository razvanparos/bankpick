import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.tsx";
import Card from "../components/Card.tsx";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import Loader from "../components/Loader.tsx";
import { deleteCard, updateCard } from "../services/cardsService.ts";
import InputComponent from "../components/InputComponent.tsx";
import ColorPicker from "../components/ColorPicker.tsx";
function UpdateCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { card } = state;

  const initialUpdateState = {
    id: card.id,
    cardNumber: card.cardNumber,
    cardName: card.cardName,
    expireYear: card.expireYear,
    expireMonth: card.expireMonth,
    cardCvv: card.cardCvv,
    cardColor: card.cardColor,
  };
  const [loading, setLoading] = useState(false);
  const [updateState, setUpdateState] = useState(initialUpdateState);

  const changeUpdateState = (fieldname, value) => {
    setUpdateState((prevState) => ({
      ...prevState,
      [fieldname]: value,
    }));
  };

  const handleUpdateCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateCard(card.id, updateState);
    setLoading(false);
  };

  const handleDeleteCard = async (e) => {
    e.preventDefault();
    await deleteCard(card.id);
    navigate("/cards");
  };

  return (
    <article className="flex flex-col gap-y-2 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Update Card"} />
        <Card card={updateState} isFlippedDefault={true} />
        <form onSubmit={handleUpdateCard} className="flex flex-col gap-y-8">
          <ColorPicker onChangeFunction={changeUpdateState} cardColor={updateState.cardColor}/>
          <FormRow labelText="Cardholder Name">
            <InputComponent
              value={updateState.cardName}
              placeholder={""}
              type="text"
              onChangeFunction={(e) => {
                changeUpdateState("cardName", e.target.value);
              }}
            />
          </FormRow>
          <FormRow labelText="Card Number">
            <InputComponent
              value={updateState.cardNumber}
              placeholder={""}
              type="number"
              onChangeFunction={(e) => {
                changeUpdateState("cardNumber", e.target.value);
              }}
            />
          </FormRow>
          <div className="flex justify-between gap-x-24">
            <div>
              <p className="text-sm text-gray">Expire date</p>
              <div className="flex items-center max-w-[250px]">
                <FormRow>
                  <InputComponent
                    value={updateState.expireMonth}
                    placeholder="mm"
                    type="number"
                    onChangeFunction={(e) => {
                      changeUpdateState("expireMonth", e.target.value);
                    }}
                  />
                </FormRow>
                <p>/</p>
                <FormRow>
                  <InputComponent
                    value={updateState.expireYear}
                    placeholder="yy"
                    type="number"
                    onChangeFunction={(e) => {
                      changeUpdateState("expireYear", e.target.value);
                    }}
                  />
                </FormRow>
              </div>
            </div>
            <FormRow labelText="CVV">
              <InputComponent
                value={updateState.cardCvv}
                placeholder=""
                type="number"
                onChangeFunction={(e) => {
                  changeUpdateState("cardCvv", e.target.value);
                }}
              />
            </FormRow>
          </div>
          <ButtonComponent
            text={loading ? <Loader /> : "Update"}
            type="primary"
          />
          <div className="w-full flex justify-center">
            <ButtonComponent
              text="Delete card"
              type="danger"
              onClickFunction={handleDeleteCard}
            />
          </div>
        </form>
      </Slide>
    </article>
  );
}

export default UpdateCard;
