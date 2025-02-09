import * as React from "react";
function IconComponent({ icon, onClickFunction }) {
  return (
    <div
      onClick={onClickFunction}
      className="flex items-center justify-center bg-darkGray p-4 w-[40px] h-[40px] rounded-full cursor-pointer"
    >
      <div className="text-2xl">{icon}</div>
    </div>
  );
}

export default IconComponent;
