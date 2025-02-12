import * as React from "react";
function NavbarButton({ icon, text, onClickFunction }) {
  return (
    <button onClick={onClickFunction} className="select-none flex flex-col items-center justify-center cursor-pointer">
      <div className="text-3xl">{icon}</div>
      <p className="text-gray">{text}</p>
    </button>
  );
}

export default NavbarButton;
