import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.tsx";
import Card from "../components/Card.tsx";
import FormRow from "../components/FormRow.tsx";
import ButtonComponent from "../components/ButtonComponent.tsx";
import Loader from "../components/Loader.tsx";
import { deleteCard, updateCard } from "../services/usersService.ts";
function UpdateCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { card } = state;

  const initialUpdateState = {
    id:card.id,
    cardNumber: card.cardNumber,
    cardName: card.cardName,
    expireYear: card.expireYear,
    expireMonth: card.expireMonth,
    cardCvv: card.cardCvv,
   
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
    setLoading(true)
    await updateCard(card.id,updateState)
    setLoading(false)
  };

  const handleDeleteCard = async (e) => {
    e.preventDefault();
    await deleteCard(card.id)
    navigate('/cards')
  };

  return (
    <article className="flex flex-col gap-y-6 p-4 w-full max-w-[460px] my-8 overflow-hidden">
      <Slide duration={300} triggerOnce={true}>
        <PageHeader text={"Update Card"} />
        <Card card={updateState} isFlippedDefault={true} />
        <form onSubmit={handleUpdateCard} className="flex flex-col gap-y-8">
          <FormRow
            value={updateState.cardName}
            type="text"
            labelText="Cardholder Name"
            onChangeFunction={(e) => {
              changeUpdateState("cardName", e.target.value);
            }}
          />
          <FormRow
            value={updateState.cardNumber}
            type="number"
            labelText="Card Number"
            onChangeFunction={(e) => {
              changeUpdateState("cardNumber", e.target.value);
            }}
          />
          <div className="flex justify-between gap-x-24">
            <div>
              <p className="text-sm text-gray">Expire date</p>
              <div className="flex items-center max-w-[250px]">
                <FormRow
                  value={updateState.expireMonth}
                  type="number"
                  placeholder="mm"
                  onChangeFunction={(e) => {
                    changeUpdateState("expireMonth", e.target.value);
                  }}
                />
                <p>/</p>
                <FormRow
                  value={updateState.expireYear}
                  type="number"
                  placeholder="yy"
                  onChangeFunction={(e) => {
                    changeUpdateState("expireYear", e.target.value);
                  }}
                />
              </div>
            </div>
            <FormRow
              value={updateState.cardCvv}   
              type="number"
              labelText="CVV"
              onChangeFunction={(e) => {
                changeUpdateState("cardCvv", e.target.value);
              }}
            />
          </div>
          <ButtonComponent
            text={loading ? <Loader /> : "Update"}
            type="primary"
           
          />
          <div className='w-full flex justify-center'>
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
