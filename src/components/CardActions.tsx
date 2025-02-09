import * as React from 'react';
import IconComponent from './IconComponent.tsx';
import { VscArrowUp } from "react-icons/vsc";
import { PiBank } from "react-icons/pi";
import { BiDollar } from "react-icons/bi";

function CardActions() {
    return ( 
        <article className='flex justify-between py-4'>
            <div className='flex flex-col items-center gap-y-2'>
                <IconComponent icon={<VscArrowUp />}/>
                <p>Send</p>
            </div>
            <div className='flex flex-col items-center gap-y-2'>
                <IconComponent icon={<VscArrowUp className='rotate-180'/>} />
                <p>Receive</p>
            </div>
            <div className='flex flex-col items-center gap-y-2'>
                <IconComponent icon={<PiBank />} />
                <p>Loan</p>
            </div>
            <div className='flex flex-col items-center gap-y-2'>
                <IconComponent icon={<BiDollar />} />
                <p>TopUp</p>
            </div>
        
        </article>
     );
}

export default CardActions;