import * as React from 'react';
import { BiDollar } from "react-icons/bi";
import ButtonComponent from './ButtonComponent.tsx';

interface TransactionRowType{
    t:any,
    key?:string
}

function TransactionRow({t}:TransactionRowType) {
    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <ButtonComponent type='transaction' text=''>
                {<BiDollar />}
              </ButtonComponent>
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