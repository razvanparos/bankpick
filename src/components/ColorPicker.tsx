import * as React from "react";
import FormRow from "./FormRow.tsx";
function ColorPicker({ onChangeFunction, cardColor }) {
  return (
    <FormRow labelText="Card color">
    <div className="flex justify-between py-2">
      {["gray", "blue-500", "yellow-300", "green-500", "red-500"].map((c) => (
        <div 
          onClick={() => {
            onChangeFunction("cardColor", c);
          }}
          className={`${
            cardColor === c ? "border-4" : ""
          } w-[50px] h-[50px] bg-${c}-small rounded-xl cursor-pointer`}
        ></div>
      ))}
    </div>
    </FormRow>
   
  );
}

export default ColorPicker;
