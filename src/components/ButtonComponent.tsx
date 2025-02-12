import * as React from "react";

interface ButtonComponentType{
  text:string,
  type:string,
  onClickFunction?:Function
}


function ButtonComponent({ text, type, onClickFunction }: ButtonComponentType) {
  const buttonClasses = {
    primary: "bg-primaryBlue p-4 rounded-xl w-full min-h-[65px]",
    secondary: "bg-darkGray p-4 rounded-xl min-h-[0px] w-full",
    round: "bg-darkGray p-2 text-3xl rounded-full w-[50px] h-[50px]",
    text: "text-primaryBlue w-fit",
  };
  
  return (
    <button
      onClick={onClickFunction}
      className={` cursor-pointer flex items-center justify-center  
          ${buttonClasses[type]}  
    `}
    >
      {text}
    </button>
  );
}

export default ButtonComponent;
