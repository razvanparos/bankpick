import * as React from "react";

interface ButtonComponentType{
  text:string,
  type:string,
  onClickFunction?:Function,
  children?:any
}


function ButtonComponent({ text, type, onClickFunction,children }: ButtonComponentType) {
  const buttonClasses = {
    primary: "bg-primaryBlue p-4 text-xl rounded-xl w-full min-h-[65px]",
    secondary: "bg-darkGray p-4 rounded-xl min-h-[0px] w-full",
    danger: "text-red-500 text-md w-fit",
    round: "bg-darkGray p-2 text-3xl rounded-full w-[50px] h-[50px]",
    text: "text-primaryBlue w-fit",
    action: "flex items-center justify-center gap-2 bg-darkGray w-[49%] py-2 rounded-full text-lg",
    homeHeader: "w-[55px] h-[55px] bg-lightGray rounded-full flex items-center justify-center",
    icon: "flex items-center justify-center bg-darkGray p-4 text-xl rounded-full",
    transaction: "flex items-center justify-center bg-primaryBlue w-[40px] h-[40px] text-xl rounded-full",
    navButton: "select-none flex flex-col-reverse items-center justify-center",
  };
  
  return (
    <button
      onClick={onClickFunction}
      className={` cursor-pointer flex items-center justify-center  
          ${buttonClasses[type]}  
    `}
    >
      {text}
      {children}
    </button>
  );
}

export default ButtonComponent;
