import * as React from "react";

interface IconType{
  icon:any,
  onClickFunction?:Function,
  type?: string
}

function IconComponent({ icon, onClickFunction, type }:IconType) {
  return (
    <div
      onClick={onClickFunction}
      className={`
        flex items-center justify-center bg-darkGray p-4 w-[50px] h-[50px] rounded-full cursor-pointer
        ${type==='transaction'?'bg-primaryBlue w-[40px] h-[40px]':''}
        `}
    >
      <div className="text-2xl">{icon}</div>
    </div>
  );
}

export default IconComponent;
