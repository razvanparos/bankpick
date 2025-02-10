import * as React from "react";
function NavbarButton({ icon, text, onClickFunction }) {
  return (
    <div onClick={onClickFunction} className="select-none flex flex-col items-center justify-center cursor-pointer">
      <div className="text-3xl">{icon}</div>
      <p className="text-gray">{text}</p>
    </div>
  );
}

export default NavbarButton;
