import * as React from "react";
import img1 from "../assets/logo.png";
import { AttentionSeeker } from "react-awesome-reveal";
function FallbackComponent() {
  return (
    <AttentionSeeker effect={'pulse'}>
      <div className="flex flex-col gap-y-4">
        <img src={img1} alt="" />
        <h2 className="text-xl font-semibold">BANKPICK</h2>
      </div>
    </AttentionSeeker>
  );
}

export default FallbackComponent;
