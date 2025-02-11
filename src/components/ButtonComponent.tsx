import * as React from "react";

interface ButtonComponentType{
  text:string,
  type:string,
  onClickFunction?:Function
}


function ButtonComponent({ text, type, onClickFunction }: ButtonComponentType) {
  const buttonClasses = {
    primary: "bg-primaryBlue p-4 rounded-xl",
    secondary: "bg-darkGray p-4 rounded-xl min-h-[0px]",
    text: "text-primaryBlue w-fit",
  };
  
  return (
    <button
      onClick={onClickFunction}
      className={` cursor-pointer flex items-center justify-center min-h-[65px] w-full
          ${buttonClasses[type]}  
    `}
    >
      {text}
    </button>
  );
}

export default ButtonComponent;
