import * as React from 'react';
import IconComponent from "./IconComponent.tsx";
import { BiDollar } from "react-icons/bi";

interface TransactionRowType{
    t:any,
    key?:string
}

function TransactionRow({t}:TransactionRowType) {
    return ( 
        <div className="flex items-center justify-between">
            <div className="flex gap-x-2">
              <IconComponent icon={<BiDollar />} type={"transaction"} />
              <div>
                <p>{t.from}</p>
                <p className='text-gray text-sm'>{`${t.transactionDate}, ${t.transactionTime}`}</p>
              </div>
            </div>
            <p className=''>{`${t.type==='income'?'+':'-'} $${t.amount}`}</p>
          </div>
     );
}

export default TransactionRow;