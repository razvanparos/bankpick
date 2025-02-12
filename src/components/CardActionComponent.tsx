import * as React from "react";
function CardActionComponent({text,icon,onClickFunction}) {
  return (
    <button onClick={onClickFunction} className="flex items-center justify-center gap-2 bg-darkGray w-[49%] py-2 rounded-full text-lg">
      <p >{text}</p>
      <div>{icon}</div>
    </button>   
  );
}

export default CardActionComponent;
