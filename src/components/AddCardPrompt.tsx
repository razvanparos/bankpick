import * as React from "react";
import ButtonComponent from "./ButtonComponent.tsx";
import { useNavigate } from "react-router-dom";
function AddCardPrompt() {
  const navigate = useNavigate();
  return (
    <article className="flex flex-col bg-darkGray items-center gap-y-4 py-4 rounded-xl">
      <ButtonComponent
        text="+"
        type="round"
        onClickFunction={() => {
          navigate("/add-card");
        }}
      />
      <h2>Add new card</h2>
    </article>
  );
}

export default AddCardPrompt;
