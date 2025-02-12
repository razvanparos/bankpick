import * as React from "react";
function InputComponent({ placeholder, onChangeFunction, type, value }) {
  return (
    <input
      value={value}
      step=".01"
      placeholder={placeholder}
      onChange={onChangeFunction}
      className={`
            ${type === "checkbox" ? "scale-125" : ""}
            border-b border-gray outline-none p-2 bg-transparent w-full
            `}
      type={type}
    />
  );
}

export default InputComponent;
