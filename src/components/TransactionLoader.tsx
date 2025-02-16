import * as React from "react";
function TransactionLoader() {
  return (
    <div className="w-full flex bg-darkGray rounded-xl p-4">
      <div className="w-[50px] h-[45px] bg-gray rounded-full animate-[pulse_0.7s_ease-in-out_infinite]"></div>
      <div className="flex flex-col gap-y-2 justify-center px-4 w-full">
        <div className="w-full bg-gray rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-[10px]"></div>
        <div className="w-[40%] bg-gray rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-[10px]"></div>
      </div>
    </div>
  );
}

export default TransactionLoader;
