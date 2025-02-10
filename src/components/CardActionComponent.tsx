import * as React from "react";
import IconComponent from './IconComponent.tsx';
function CardActionComponent({text,icon}) {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <IconComponent icon={icon} />
      <p>{text}</p>
    </div>
  );
}

export default CardActionComponent;
